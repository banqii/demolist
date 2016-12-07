<?php 
	header("Content-Type:application/json;charset=UTF-8"); 
	date_default_timezone_set('prc');
	require_once("dbconn.php");
	$newstype = $_REQUEST['newstype']; //获取表单数据
	$newstitle = $_REQUEST['newstitle'];
	$newscontent = $_REQUEST['newscontent'];
	$newsimage = $_REQUEST['newsimage'];
	$addtime = date('y-m-d h:i:s',time()); //生成添加日期

	$sql = 'INSERT INTO `news` (`newstype`,`newstitle`,`newscontent`,`newsimage`,`addtime`) VALUES ("'.$newstype.'","'.$newstitle.'","'.$newscontent.'","'.$newsimage.'","'.$addtime.'")'; //拼接sql语句

	$result = mysql_query($sql,$con); //执行sql语句


	if ($result) {
		require_once('after.php');
	}else{
		echo '0';
	}
	
	mysql_close($con);
 ?>