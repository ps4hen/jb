//------BIG THANKS TO SISTRO FOR THIS !!!!!--------

var LoadedMSG = "Payload Загружен!";

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
			console.log("BinLoader Сервер не запущен, пытаюсь загрузить онлайн Payload...");
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
                            console.log('Payload не отправлен, пробую онлайн Payload загрузку...');
                            setTimeout(() => {
                                Loadpayloadonline(PLfile);
                            }, 3000); // 3 seconds delay
                            return;
                        }
                    })
                }
			});
			} else {
				alert("Невозможно загрузить Payload, так как сервер BinLoader занят");//<<If server is busy, alert message.
				return;
		  }
	  };
  }

//--------------------------------------------------

//------Payloads--------

// Load Payloads with exploit

function Loadpayloadonline(PLfile) {
    window.payload_path = PLfile;
    // If we have access to toogle_payload from lapse.js, use it
    if (typeof window.toogle_payload === 'function') {
        window.toogle_payload(PLfile);
    } else {
        console.log('Payload настроен на загрузку после эксплойта: ' + PLfile);
    }
}

// PSFree Fix

function load_PSFreeFix(){
    const Confirmation = confirm("Вы уверены, что хотите загрузить PSFree Fix? payload?");
    if (Confirmation) {
        // First try local loading through GoldHen
        Loadpayloadlocal("./payloads/ps4-psfree-fix.bin");
        
        // Also show loading message
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "PSFree Fix Payload Загружен!";
        }
    }
}

// App2USB - Transfer Apps to USB
function load_app2usb(){
    const Confirmation = confirm("Загрузить Payload App2USB? Это позволяет переносить приложения на USB-накопитель..");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/app2usb.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "App2USB Payload Загружен!";
        }
    }
}

// AppCache Install
function load_appcache_install(){
    const Confirmation = confirm("Загрузить AppCache Install payload?");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/appcache-install.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "AppCache Install Payload Загружен!";
        }
    }
}

// Backup
function load_backup(){
    const Confirmation = confirm("Загрузить Backup payload? Это позволит создать резервную копию ваших системных данных.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/backup.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "Backup Payload Загружен!";
        }
    }
}

// Disable Updates
function load_disable_updates(){
    const Confirmation = confirm("Загрузить Disable Updates payload? Это заблокирует обновления системы.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/disable-updates.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "Disable Updates Payload Загружен!";
        }
    }
}

// Enable Updates
function load_enable_updates(){
    const Confirmation = confirm("Загрузить Enable Updates payload? Это позволит обновлять систему.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/enable-updates.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "Enable Updates Payload Загружен!";
        }
    }
}

// FTP Server
function load_ftp(){
    const Confirmation = confirm("Загрузить FTP Server payload? Это запустит FTP-сервер на вашей PS4.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/ftp.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "FTP Server Payload Загружен!";
        }
    }
}

// History Blocker
function load_history_blocker(){
    const Confirmation = confirm("Загрузить History Blocker payload? Это заблокирует отслеживание истории браузера.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/history-blocker.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "History Blocker Payload Загружен!";
        }
    }
}

// PS4 Debug
function load_ps4debug(){
    const Confirmation = confirm("Загрузить PS4Debug payload? Это включает функции отладки.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/ps4debug.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "PS4Debug Payload Загружен!";
        }
    }
}

// PUP Decrypt
function load_pup_decrypt(){
    const Confirmation = confirm("Загрузить PUP Decrypt payload? Это позволяет расшифровать файлы обновления PS4.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/pup-decrypt.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "PUP Decrypt Payload Загружен!";
        }
    }
}

// Restore
function load_restore(){
    const Confirmation = confirm("Загрузить Restore payload? Это восстановит ваши системные данные.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/restore.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "Restore Payload Загружен!";
        }
    }
}

// RIF Renamer
function load_rif_renamer(){
    const Confirmation = confirm("Загрузить RIF Renamer payload? Этот инструмент управляет файлами лицензий.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/rif-renamer.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "RIF Renamer Payload Загружен!";
        }
    }
}

// WebRTE
function load_webrte(){
    const Confirmation = confirm("Загрузить WebRTE payload? Это позволяет использовать функции редактирования в реальном времени.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/WebRTE_900.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "WebRTE Payload Загружен!";
        }
    }
}

// Make all functions globally available
window.load_PSFreeFix = load_PSFreeFix;
window.load_app2usb = load_app2usb;
window.load_appcache_install = load_appcache_install;
window.load_backup = load_backup;
window.load_disable_updates = load_disable_updates;
window.load_enable_updates = load_enable_updates;
window.load_ftp = load_ftp;
window.load_history_blocker = load_history_blocker;
window.load_ps4debug = load_ps4debug;
window.load_pup_decrypt = load_pup_decrypt;
window.load_restore = load_restore;
window.load_rif_renamer = load_rif_renamer;
window.load_webrte = load_webrte;
