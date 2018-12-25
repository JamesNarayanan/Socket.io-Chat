var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('A user connected');
	io.emit('con', 'A user connected');
	
	socket.on('disconnect', function(){
		console.log('A user disconnected');
		io.emit('con', 'A user disconnected');
	});
	
	socket.on('chat message', function(id, name, msg){
		console.log("Id: " + id + " | Name: " + name + " | Message: " + msg);
		io.emit('chat message', id, name, msg);
	});
	
	socket.on('typing', function(username){
		console.log(username + ' is typing');
		io.emit('typing', username);
	});
	
	socket.on('not typing', function(username){
		console.log(username + ' is not typing');
		io.emit('not typing', username);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
