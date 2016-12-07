<?php 
	// header("Content-type:appliacation/json;charset=utf-8");
	header("Cache-Control:max-age=0");
	$i = 0;
	while ($i<9) {
		$i++;
		// $result = array("success"=>"ok","text"=>"i am test text!");
		// echo json_encode($result);
		sleep(1);
		$random = rand(1,999);
		echo $random;
		echo "<br/>";
		//每次循环向浏览器输出
		ob_flush();
		flush();
	}
?>