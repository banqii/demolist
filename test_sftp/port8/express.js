var express = require('express');

var app = express();

//二、express下的中间件  用于读取静态文件
app.use(express.static('./public'));



//三、路由

//1.path方法
app.get('/',function(req, res){
	res.end('hello\n');
});

//2.Router方法
var Router = express.Router();
/*
	http://example.com/post/add
	http://example.com/post/list
 */

Router.get('/add',function(req, res){
	res.end('Router /add\n');
});

Router.get('/list',function(req, res){
	res.end('Router /list\n');
});

app.use('/post',Router);

//3.route方法
app.route('/article')
	.get(function(req, res){
		res.end('route /article get\n');
	})
	.post(function(req, res){
		res.end('route /article post\n');
	});

//四、路由参数
app.param('newsId',function(req, res, next, newsId){
	//正常工程中这里写一些从数据库读取信息的方法
	req.newsId = newsId;
	next();
});

//用简单的path路由方法测试路由参数
app.get('/news/:newsId', function(req, res){
	res.end('newsId: ' + req.newsId + '\n');
});


//一、监听端口  做出响应
app.listen(3000,function afterListen(){
	console.log('express runing on http:localhost:3000');
});

