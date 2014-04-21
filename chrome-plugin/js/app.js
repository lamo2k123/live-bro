
chrome.runtime.onMessage.addListener(function(request, sender, senderResponse){
        if(request.msg === 'socket') {
            var socket = io.connect(request.data.url);

            socket.emit('bro:watcher', {
                path : request.data.path
            });

            socket.on('bro:watcher', function(status) {
                chrome.runtime.sendMessage({
                    msg : 'bro:watcher',
                    status : status
                }, function(response){
                    console.log('response', response);
                });
                console.log(status);
            });

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