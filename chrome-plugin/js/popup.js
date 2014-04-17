chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

    if(tabs[0].url.indexOf('club.vm-dev') != -1) {
        var button = document.getElementById('button-go');
        var input = document.getElementById('socket-url');

        button.onclick = function() {
            console.log(tabs);
            chrome.runtime.sendMessage({
                msg : 'socket',
                data : {
                    tabId : tabs[0].id,
                    url : input.value
                }
            },function(response){
                console.log('response', response);
            });
        }
    }
});