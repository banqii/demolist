var Client = require('easymysql');
var conn = Client.create({
    'maxconnections': 10
});

conn.addserver({
    'host': '127.0.0.1',
    'user': 'root',
    'password': '123456',
    'database': 'baidunews'
});



exports.conn = conn;