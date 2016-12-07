var net = require('net');

const HOST = '127.0.0.1';
const PORT = 18001;

var tcpClient = net.Socket();

tcpClient.connect(PORT, HOST, function(){
	console.log('connect success!');
	tcpClient.write('this is tcp client ty Node.js');
});

tcpClient.on('data', function(data){
	console.log('received: ', data.toString());
});