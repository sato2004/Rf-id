
	
	chrome.serial.getDevices(function(devices) {
		
		
		
	var	device_path=devices[0]['path'];
	chrome.serial.connect(device_path, {bitrate: 38400}, onConnect);
	
	 
		
    document.getElementById('vot').innerHTML = device_path;
}); 
	var stringReceived = '';
 var onConnect = function(connectionInfo) {
        var connectionId = connectionInfo.connectionId;

        var onReceiveCallback = function(info) {
            if (info.connectionId == connectionId) {
                var str = arrayBufferToString(info.data);
                 
                if (true) {
                    stringReceived += str.substring(0, str.length);
                    chrome.runtime.sendMessage('kglfkgbfanoggacbcedmlkeaacfliodd', {
                        action: 'scanner', data: {
                            barcode: stringReceived
                        }
                    });
					
					document.getElementById('vot').innerHTML = stringReceived;
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
        var bit = [];
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
			bit[i]=bytes[ i ].toString(16);
			
			if(bit[i].length==1) bit[i]='0'+bit[i];
			
			string +=bit[i]
        }
		
        return string;
    }
	
	
