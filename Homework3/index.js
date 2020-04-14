var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const getOnlineUsers = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(s => s.user);
  return users.filter(u => u != undefined);
};

io.on('connection', function(socket){

 const emitOnlineUsers = () => {
      socket.broadcast.emit("users", getOnlineUsers());
    };
  socket.on("add_user", user => {
         socket.emit("server_message", {
           name: website,
           message: `Welcome to the Chat App !`
         });

         socket.broadcast.emit("server_message", {
           name: website,
           message: `${user.name} just Joined Chat`
         });

         socket.user = user;
         emitOnlineUsers();
       });
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

  socket.on("disconnect", function() {
          const { user } = socket;

          if (user) {
            socket.broadcast.emit("server_message", {
              name: website,
              message: `${user.name} just left chat`
            });
          }

          emitOnlineUsers();
        });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});