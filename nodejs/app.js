var io = require('socket.io').listen(4444);

io.sockets.on('connection', function (socket) {

        var watcher = function(dir) {
            require('fs').watch(dir, { persistent: true }, function(event, filename) {
                if(!/___jb_old___/.test(filename) && !/___jb_bak___/.test(filename)) {
                    socket.emit('debug:live:reload', {
                        event : event,
                        filename : filename
                    });
                }
            });

            var dirs = require('fs').readdirSync(dir);
            for(var i in dirs) {
                if(require('fs').statSync([dir, dirs[i]].join('/')).isDirectory()) {
                    watcher([dir, dirs[i]].join('/'));
                }
            }
        }

        watcher(__dirname + '/../public');

});