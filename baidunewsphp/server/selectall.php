<?php 
	header("Content-Type:application/json;charset=UTF-8"); 
	date_default_timezone_set('prc');
	require_once("dbconn.php");

	$sql = 'SELECT * FROM `news` ORDER BY `newsid` DESC';

	$result = mysql_query($sql,$con); //执行sql语句

	if (!$result) {
		die('Error'.mysql_error());
	}else{
		$arr = array();
		while($row = mysql_fetch_array($result)){
		array_push($arr,array("newsid"=>$row['newsid'],"newstype"=>$row['newstype'],"newstitle"=>$row['newstitle'],));
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);//设置json数据不用unicode编码
	}
	
	mysql_close($con);
	
 ?>