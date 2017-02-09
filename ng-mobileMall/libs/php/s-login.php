<?php
	include "DBHelper.php";
	
	$sqlcheck = "select * from server where email='" . $_POST["email"] . "' and password='" . $_POST["password"] . "';";
	$result = query($sqlcheck);
	
	if(count($result) > 0){
		echo '{"state":true}';
		session_start();
		$_SESSION["s-email"] = $_POST["email"];
	}else{
		echo '{"state":false,"message":"登录失败"}';
	}
?>