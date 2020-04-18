var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var connectedUsers = [];

io.on('connection', function(socket){
//   io.emit('chat message', 'someone connected');

  socket.on('disconnect', function(msg) {
    try {
      nickname = io.sockets.manager.roomClients[socket.id];
      socket.broadcast.emit('disconnected', {disconnected_nickname: nickname});
    }
    catch {
      console.log("couldn't find socket nickname");
    }
  });

//   //handling disconnects
  socket.on('disconnect_manually', function(msg) {
    console.log("disconnecting " + msg.nickname);
    console.log("connected users: " + JSON.stringify(connectedUsers));
    console.log("msg name: " + msg.nickname)
    user_index = connectedUsers.indexOf(msg.nickname);
    connectedUsers.splice(user_index, 1);
    console.log("connected users: " + JSON.stringify(connectedUsers));
    socket.emit('disconnected', {connected: false});
    socket.broadcast.emit('disconnected', {nickname: msg.nickname});
  });

  socket.on('sign_in', function(msg){
    console.log("signing in " + msg.nickname);
    connectedUsers.push(msg.nickname);
    socket.join(msg.nickname);
    socket.emit('sign_in', {connected: true});
    socket.broadcast.emit('connected', {nickname: msg.nickname});
  });

  socket.on('chat message', function(msg){
    console.log("got chat message")
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
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
