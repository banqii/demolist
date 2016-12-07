<?php 
	header("Content-Type:application/json;charset=UTF-8"); 
	date_default_timezone_set('prc');
	require_once("dbconn.php");

	$newsid = (int)$_REQUEST['newsid'];
	$newstype = $_REQUEST['newstype']; //获取表单数据
	$newstitle = $_REQUEST['newstitle'];
	$newscontent = $_REQUEST['newscontent'];
	$newsimage = $_REQUEST['newsimage'];

	$sql = 'UPDATE `news` SET `newstype` = "'.$newstype.'", `newstitle` = "'.$newstitle.'", `newscontent` = "'.$newscontent.'", `newsimage` = "'.$newsimage.'" WHERE `newsid` = "'.$newsid.'"';

	$result = mysql_query($sql,$con); //执行sql语句

	if ($result) {
		require_once('after.php');
	}else{
		die("Could not connect:".mysql_error());
	}
	
	mysql_close($con);
 ?>