<?php 
	$con = mysql_connect("localhost", "root", "123456"); //连接数据库
	if(!$con){
		die("Could not connect:".mysql_error()); //报错
	}
	
	mysql_select_db("baidunews", $con); //连接表
	mysql_query("set names 'utf8'"); //设置sql执行编码
 ?>