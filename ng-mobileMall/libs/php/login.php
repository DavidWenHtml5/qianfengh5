<?php
	include "DBHelper.php";
	
	$sqlcheck = "select * from user where account='" . $_POST["account"] . "' and password='" . $_POST["password"] . "';";
	$result = query($sqlcheck);
	
	if(count($result) > 0){
		echo '{"state":true,"message":"登录成功"}';
		session_start();
		$_SESSION["account"] = $_POST["account"];
	}else{
		echo '{"state":false,"message":"登录失败"}';
	}
?>