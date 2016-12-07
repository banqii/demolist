//主js文件

var urlLib = require('url');
var mysql = require("./dbconn.js"); //数据库连接模块
var express = require('express');
var app = express();

//突然发现解决跨域的一些问题后，
//前台传的参数跑到req.query这里了。。
//不再是req.params['newstype']

// //数据库连接
// function dbconn() {

//     var connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '123456',
//         database: 'baidunews'
//     });
//     return connection;
// }
//更多新闻
app.get('/getmore', function(req, res) {
    var newstype = req.query['newstype'];
    var newscount = req.query['newscount'];

    console.log(req.query);
    if (newstype == '推荐') {
        var sql = 'SELECT * FROM `news` ORDER BY `newsid` DESC LIMIT ' + newscount + ',5';
    } else {
        var sql = 'SELECT * FROM `news` WHERE `newstype` = "' +
            newstype + '" ORDER BY `newsid` DESC LIMIT ' + newscount + ',5';
    }

    sqlImplAndres(sql, req, res);

});

//查询新闻种类
app.get('/getnews', function(req, res) {
    var newstype = req.query['newstype']; 
    
    if (newstype == '推荐') {
        var sql = 'SELECT * FROM `news` ORDER BY `newsid` DESC LIMIT 0,9';
    } else {
        var sql = 'SELECT * FROM `news` WHERE `newstype` = "' +
            newstype + '" ORDER BY `newsid` DESC LIMIT 0,9';
    }


    sqlImplAndres(sql, req, res);

});

///////    后台begin     ////////

//sql语句的执行及查询结果输出到前端
function sqlImplAndres(sql, req, res){
	if (sql == 'all') {
		sql = 'SELECT * FROM `news` ORDER BY `newsid` DESC';
	}
	mysql.conn.query({
        'sql': sql
        // params: { user: 'user' }
    }, function(err, rows) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:18000');
        var parms = urlLib.parse(req.url, true);
        var str = parms.query.callback + '(' + JSON.stringify(rows) + ')';
        // console.log(str);
        res.end(str);
    });
}
//sql语句的执行及查询结果返回
function sqlImpl(sql, req, res){
	mysql.conn.query({
        'sql': sql
        // params: { user: 'user' }
    }, function(err, rows) {
    	if (err) throw err;
        console.log('sqlImpl seccess!  '+rows);
    });
}

//查询所有
app.get('/selectall', function(req, res) {
    var sql = 'SELECT * FROM `news` ORDER BY `newsid` DESC';

    sqlImplAndres(sql, req, res);
});

//查询单个
app.get('/selectone', function(req, res) {

	var newsid = req.query['newsid'];
    var sql = 'SELECT * FROM `news` WHERE `newsid` = "'+ newsid +'" ORDER BY `newsid` DESC';

    sqlImplAndres(sql, req, res);
});
//修改
app.get('/update', function(req, res) {
    var newsid = req.query['newsid'];
    var newstype = req.query['newstype'];
    var newscontent = req.query['newscontent'];
    var newstitle = req.query['newstitle'];
    var newsimage = req.query['newsimage'];
console.log(req.query);
    var sql = 'UPDATE `news` SET `newstype` = "' + newstype + '", `newscontent` = "' + newscontent + '", `newstitle` = "' +
        newstitle + '", `newsimage` = "' + newsimage + '" WHERE `newsid` = "' + newsid + '"';

    sqlImpl(sql, req, res);
    sqlImplAndres('all', req, res);
});
//删除
app.get('/delete', function(req, res) {
        var newsid = req.query['newsid'];

        var sql = 'DELETE FROM `news` WHERE `newsid` = "' + newsid + '"';

        sqlImpl(sql, req, res);
        sqlImplAndres('all', req, res);
    })
    //新增
app.get('/insert', function(req, res) {
    var newstype = req.query['newstype'];
    var newscontent = req.query['newscontent'];
    var newstitle = req.query['newstitle'];
    var newsimage = req.query['newsimage'];
    var addtime = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
    console.log(req.query);
    var sql = 'INSERT INTO `news` (`newstype`,`newstitle`,`newscontent`,`newsimage`,`addtime`) VALUES ("' +
        newstype + '","' + newstitle + '","' + newscontent + '","' + newsimage + '","' + addtime + '")';

    sqlImpl(sql, req, res);

    sqlImplAndres('all', req, res);
});
//监听
app.listen(18000, function() {
    console.log('server is running on http://localhost:18000');
});
