var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));



app.get('/',function(req,res) {
	res.sendFile(__dirname+'/index.html');
});


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var terminals = [];

var nsp = io.of('/terminal-namespace');
nsp.on('connection', function(socket){
	console.log("User is Connected");
	terminals.push(socket.id);
	socket.emit('yourId',socket.id);

	nsp.emit('initialize','Begin')

	socket.on(terminals[0],function(data) {
		nsp.emit(terminals[1],data);
	})

	socket.on(terminals[1],function(data) {
		nsp.emit(terminals[0],data);
	})

	socket.on('disconnect', function(){
    		terminals = null;
  	});
});

http.listen(3000);


