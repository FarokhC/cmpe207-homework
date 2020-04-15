var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('typing', function(msg){
    console.log("typing");
    if(msg.nickname) {
      socket.broadcast.emit('typing', msg);
    }
    else {
      socket.broadcast.emit('typing', null);
    }
  });
  socket.broadcast.emit('hi');

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});