
chrome.runtime.onMessage.addListener(function(request, sender, senderResponse){
        console.log(request);
        if(request.msg === 'socket') {
            var socket = io.connect(request.data.url);

            socket.on('debug:live:reload',function(data){
                if(data) {

                    chrome.tabs.reload(request.data.tabId, function() {
                        console.log('RELOAD', arguments, request.data.tabId);
                    });

                }
            });

        }
    }
);