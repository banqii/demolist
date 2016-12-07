var http = require('http');

var requestHandler = function(req, res){
	res.end('hello this is web.js');
};

var web = http.createServer(requestHandler);

web.listen(18000);

console.log('http running on http://localhost:18000');
