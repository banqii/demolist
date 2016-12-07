<?php  
	$con = mysql_connect("localhost", "root", "123456");
	if(!$con){
		die("Could not connect:".mysql_error());
	}else{
		echo "mysql connect ok";
	}
	mysql_close();
?>