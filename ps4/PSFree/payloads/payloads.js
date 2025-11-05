//------BIG THANKS TO SISTRO FOR THIS !!!!!--------

var getPayload = function(payload, onLoadEndCallback) {
  var req = new XMLHttpRequest();
  req.open('GET', payload);
  req.send();
  req.responseType = "arraybuffer";
  req.onload = function (event) {
      if (onLoadEndCallback) onLoadEndCallback(req, event);
  };
}

var sendPayload = function(url, data, onLoadEndCallback) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.send(data);

  req.onload = function (event) {
      if (onLoadEndCallback) onLoadEndCallback(req, event);
  };
}

//Load payloads with GoldHEN

function Loadpayloadlocal(PLfile){ //Loading Payload via Payload Param.
    var PS4IP = "127.0.0.1";

	// First do an initial check to see if the BinLoader server is running, ready or busy.
	var req = new XMLHttpRequest();
    if (PS4IP == "127.0.0.1") {
      req.open("POST", `http://${PS4IP}:9090/status`);
    } else {
      req.open("GET", `http://${PS4IP}:9090/status`);
    }
		req.send();
		req.onerror = function(){
			//alert("Cannot Load Payload Because The BinLoader Server Is Not Running");//<<If server is not running, alert message.
            //ServerStatus("Cannot Load Payload Because The BinLoader Server Is Not Running");
            import('../psfree/alert.mjs');
            Loadpayloadonline(PLfile);
			return;
		};
		req.onload = function(){
			var responseJson = JSON.parse(req.responseText);
			if (responseJson.status=="ready"){
		    getPayload(PLfile, function (req) {
				if ((req.status === 200 || req.status === 304) && req.response) {
				    //Sending bins via IP POST Method
                    sendPayload(`http://${PS4IP}:9090`, req.response, function (req) {
                        if (req.status === 200) {
                            //alert("Payload sent !");
                        }else{
                            //alert('Payload not sent !');
                            setTimeout(() => {
                                import('../psfree/alert.mjs');
                                Loadpayloadonline(PLfile);
                            }, 3000); // 3 seconds delay
                            return;
                        }
                    })
                }
			});
			} else {
				alert("Cannot Load Payload Because The BinLoader Server Is Busy");//<<If server is busy, alert message.
				return;
		  }
	  };
  }

//--------------------------------------------------

//------Payloads--------

// Load Payloads with exploit

function Loadpayloadonline(PLfile) {
    window.payload_path = PLfile;
}

// Payloads

export function HEN(){
    Loadpayloadlocal("./payloads/HEN/HEN.bin");
}

// Dumpers

export function load_AppDumper(){
    Loadpayloadlocal("./payloads/Bins/Dumper/app-dumper.bin");
}

export function load_KernelDumper(){
    Loadpayloadlocal("./payloads/Bins/Dumper/kernel-dumper.bin");
}

export function load_VTXDumper(){
    Loadpayloadlocal("./payloads/Bins/Dumper/ps4-dumper-vtx-900.bin");
}

export function load_ModuleDumper(){
    Loadpayloadlocal("./payloads/Bins/Dumper/module-dumper.bin");

}


// Tools

export function load_PS4Debug(){
    Loadpayloadlocal("./payloads/Bins/Tools/ps4debug.bin");
}

export function load_App2USB(){
    Loadpayloadlocal("./payloads/Bins/Tools/app2usb.bin");
}


export function load_BackupDB(){
    Loadpayloadlocal("./payloads/Bins/Tools/backup.bin");
}

export function load_RestoreDB(){
    Loadpayloadlocal("./payloads/Bins/Tools/restore.bin");
}

export function load_DisableASLR(){
    Loadpayloadlocal("./payloads/Bins/Tools/disable-aslr.bin");
}

export function load_DisableUpdates(){
    Loadpayloadlocal("./payloads/Bins/Tools/disable-updates.bin");
}

export function load_EnableUpdates(){
    Loadpayloadlocal("./payloads/Bins/Tools/enable-updates.bin");
}

export function load_ExitIDU(){
    Loadpayloadlocal("./payloads/Bins/Tools/exit-idu.bin");
}
  
export function load_FTP(){
    Loadpayloadlocal("./payloads/Bins/Tools/ftp.bin");
}
  
export function load_HistoryBlocker(){
    Loadpayloadlocal("./payloads/Bins/Tools/history-blocker.bin");
}
  
export function load_RIFRenamer(){
    Loadpayloadlocal("./payloads/Bins/Tools/rif-renamer.bin");
}
  
// export function load_Orbis(){
//     Loadpayloadlocal("./payloads/Bins/Tools/Orbis-Toolbox-900.bin");
// }

// export function load_WebrRTE(){
//     Loadpayloadlocal("./payloads/Bins/Tools/WebRTE_900.bin");
// }

export function load_ToDex(){
    Loadpayloadlocal("./payloads/Bins/Tools/ToDex.bin");
}

export function load_ToDev(){
    Loadpayloadlocal("./payloads/Bins/Tools/ToDev.bin");
}

export function load_ToKratos(){
    Loadpayloadlocal("./payloads/Bins/Tools/ToKratos.bin");
}

export function load_ToCex(){
    Loadpayloadlocal("./payloads/Bins/Tools/ToCex.bin");
}

export function load_KernelClock(){
    Loadpayloadlocal("./payloads/Bins/Tools/kernel-clock.bin");
}

export function load_PermanentUART(){
    Loadpayloadlocal("./payloads/Bins/Tools/permanent-uart.bin");
}

export function load_PUPDecrypt(){
    Loadpayloadlocal("./payloads/Bins/Tools/pup-decrypt.bin");
}

// Linux

export function load_Linux(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-1gb.bin`);
}

export function load_Linux2gb(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-2gb.bin`);
}

export function load_Linux3gb(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-3gb.bin`);
}

export function load_Linux4gb(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-4gb.bin`);
}

// Linux-PRO

export function load_Linux_PRO(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-1gb-pro.bin`);
}

export function load_Linux2gb_PRO(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-2gb-pro.bin`);
}

export function load_Linux3gb_PRO(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-3gb-pro.bin`);
}

export function load_Linux4gb_PRO(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-4gb-pro.bin`);
}

// Linux-Baikal

export function load_Linux_Baikal(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-1gb-baikal.bin`);
}

export function load_Linux2gb_Baikal(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-2gb-baikal.bin`);
}

export function load_Linux3gb_Baikal(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-3gb-baikal.bin`);
}

export function load_Linux4gb_Baikal(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-4gb-baikal.bin`);
}

// Linux-Baikal-PRO

export function load_Linux_PRO_Baikal(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-1gb-pro-baikal.bin`);
}

export function load_Linux2gb_PRO_Baikal(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-2gb-pro-baikal.bin`);
}

export function load_Linux3gb_PRO_Baikal(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-3gb-pro-baikal.bin`);
}

export function load_Linux4gb_PRO_Baikal(){
    Loadpayloadlocal(`./payloads/Bins/Linux/fw${ps4fw}/payload-${ps4fw}-4gb-pro-baikal.bin`);
}

// Mod Menu

// GTA

export function load_GTAArbic127(){
    Loadpayloadlocal("./payloads/Bins/GTA/ArabicGuy-1.0-1.27-rfoodxmodz.bin");
}

export function load_GTAArbic132(){
    Loadpayloadlocal("./payloads/Bins/GTA/ArabicGuy-1.0-1.32-rfoodxmodz.bin");
}

export function load_GTAArbic133(){
    Loadpayloadlocal("./payloads/Bins/GTA/ArabicGuy-1.0-1.33-rfoodxmodz.bin");
}


export function load_GTABQ133(){
    Loadpayloadlocal("./payloads/Bins/GTA/BeefQueefMod-1.33.bin");
}

export function load_GTABQ134(){
    Loadpayloadlocal("./payloads/Bins/GTA/BeefQueefMod-1.34.bin");
}

export function load_GTABQ138(){
    Loadpayloadlocal("./payloads/Bins/GTA/BeefQueefMod-1.38.bin");
}

export function load_GTAWM132(){
    Loadpayloadlocal("./payloads/Bins/GTA/WildeModz-1.32.bin");
}

export function load_GTAWM134(){
    Loadpayloadlocal("./payloads/Bins/GTA/WildeModz-1.34.bin");
}

export function load_GTAWM138(){
    Loadpayloadlocal("./payloads/Bins/GTA/WildeModz-1.38.bin");
}

// RDR2

export function load_Oysters100(){
    Loadpayloadlocal("./payloads/Bins/RDR2/OystersMenu-1.00-FREE.bin");
}


export function load_Oysters113(){
    Loadpayloadlocal("./payloads/Bins/RDR2/OystersMenu-1.13-FREE.bin");
}

export function load_Oysters119(){
    Loadpayloadlocal("./payloads/Bins/RDR2/OystersMenu-1.19-FREE.bin");
}

export function load_Oysters124(){
    Loadpayloadlocal("./payloads/Bins/RDR2/OystersMenu-1.24-FREE.bin");
}

export function load_Oysters129(){
    Loadpayloadlocal("./payloads/Bins/RDR2/OystersMenu-1.29-FREE.bin");
}

// AppCache

export function load_AppCache(){
    Loadpayloadlocal("./payloads/Bins/Tools/appcache-install.bin");
}

// PSFree Fix

export function load_PSFreeFix(){
    const Confirmation = confirm("Are you sure you want to install the PSFree Fix? This will overwrite any existing files.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/Bins/Tools/ps4-psfree-fix.bin");
    }
}
