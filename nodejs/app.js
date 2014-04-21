var path    = require('path'),
    nconf   = require('nconf').argv(),
    io      = require('socket.io').listen(nconf.get('port') || 4444);

io.sockets.on('connection', function(socket) {
    var watcher = function(dir, callback) {
        require('fs').watch(dir, { persistent: true }, function(event, filename) {
            socket.emit('debug:live:reload', {
                event : event,
                filename : filename
            });
        });

        var dirs = require('fs').readdirSync(dir);

        for(var i in dirs) {
            if(require('fs').statSync([dir, dirs[i]].join('/')).isDirectory()) {
                watcher([dir, dirs[i]].join('/'));
            }
        }

        callback && callback();
    };

    socket.on('bro:watcher', function(data) {
        watcher(path.join(__dirname, data.path), function(){
            socket.emit('bro:watcher', true);
        });
    });

});