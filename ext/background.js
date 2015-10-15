 var onMessage = function(data) {
        switch (data.action) {
            case 'scanner': {
                chrome.tabs.query({url: "http://nytro.com.ua/*"}, function(tab) {
                    for (var i = 0; i < tab.length; i++) {
                        chrome.tabs.sendMessage(tab[i].id, data);
                    }
                });
            }
        }
    };
    chrome.runtime.onMessageExternal.addListener(onMessage);