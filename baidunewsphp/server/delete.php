<?php 
	header("Content-Type:application/json;charset=UTF-8"); 
	date_default_timezone_set('prc');
	require_once("dbconn.php");

	$newsid = (int)$_REQUEST['newsid'];

	$sql = 'DELETE FROM `news` WHERE `newsid` = "'.$newsid.'"';

	$result = mysql_query($sql,$con); //执行sql语句

	if ($result) {
		require_once('after.php');
	}else{
		echo '0';
	}
	
	mysql_close($con);
 ?>