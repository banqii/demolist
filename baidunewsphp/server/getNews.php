<?php  
	// 从数据库中查出新闻
	header("Content-Type:application/json;charset=UTF-8"); 
	date_default_timezone_set('prc');
	require_once("dbconn.php");

	$newstype = $_REQUEST['newstype'];

	if ($newstype!='推荐') {
		$sql = 'SELECT * FROM `news` WHERE `newstype` = "'.$newstype.'" LIMIT 0,9';
	}else{
		$sql = 'SELECT * FROM `news` LIMIT 0,9';
	}

	$result = mysql_query($sql,$con);

	if (!$result) {
		die('Error'.mysql_error());
	}else{
		$arr = array();
		while($row = mysql_fetch_array($result)){
			array_push($arr,array("newsid"=>$row['newsid'],"newstype"=>$row['newstype'],"newstitle"=>$row['newstitle'],"newscontent"=>$row['newscontent'],"newsimage"=>$row['newsimage'],"addtime"=>$row['addtime']));
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);//设置json数据不用unicode编码
	}

	mysql_close($con);
?>
