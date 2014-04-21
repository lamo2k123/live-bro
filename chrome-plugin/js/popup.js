chrome.storage.local.get('url', function(obj) {
    document.getElementById('socket-url').value = obj.url;
});

chrome.storage.local.get('path', function(obj) {
    document.getElementById('watcher-path').value = obj.path;
});

chrome.runtime.onMessage.addListener(function(request, sender, senderResponse) {
    console.log(request);
    if(request.msg === 'bro:watcher') {
        if(request.status) {
            document.getElementsByTagName('body')[0].bgColor = 'green'
        } else {
            document.getElementsByTagName('body')[0].bgColor = 'red'
        }
    }

});

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

    if(tabs[0].url.indexOf('club.vm-dev') != -1) {
        var button = document.getElementById('button-go');

        button.onclick = function() {
            var url = document.getElementById('socket-url').value;
            var path = document.getElementById('watcher-path').value;

            chrome.storage.local.set({
                url : url,
                path: path
            });

            chrome.runtime.sendMessage({
                msg : 'socket',
                data : {
                    tabId : tabs[0].id,
                    url : url,
                    path: path
                }
            },function(response){
                console.log('response', response);
            });
        }
    }
});