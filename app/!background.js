chrome.app.runtime.onLaunched.addListener(function() {
	  var	device_path="COM3";
        chrome.serial.connect(device_path, {bitrate: 115200}, onConnect);
		
			
			
    });
    var stringReceived = '';

    var onConnect = function(connectionInfo) {
        var connectionId = connectionInfo.connectionId;

        var onReceiveCallback = function(info) {
            if (info.connectionId == connectionId) {
                var str = arrayBufferToString(info.data);
                if (str.charAt(str.length-1) === '#') {
                    stringReceived += str.substring(0, str.length-1);
                    chrome.runtime.sendMessage('kglfkgbfanoggacbcedmlkeaacfliodd', {
                        action: 'scanner', data: {
                            barcode: stringReceived
                        }
                    });
                    stringReceived = '';
                } else {
                    stringReceived += str;
                }
            }
        };

        chrome.serial.onReceive.addListener(onReceiveCallback);
    };

    function arrayBufferToString (buffer) {
        var string = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            string += String.fromCharCode( bytes[ i ] )
        }
        return string;
    }