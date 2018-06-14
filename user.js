var io = require('socket.io-client')

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const socket = io('http://localhost:3000/terminal-namespace');

var myId;

var history = "";

socket.on('yourId',function(msg){
	myId = msg;
	console.log(msg)

	socket.on(myId,function(input){
		history = history + '[otherUser] ' + input + "\n"
 		process.stdout.write('\033c');
		process.stdout.cursorTo(0);
		console.log(history);
	});

})

rl.on('line', function(input){
		history = history + '[you] ' + input + "\n";
 		 process.stdout.write('\033c');
		console.log(history)
		socket.emit(myId,input);
})




