<?php
	include "DBHelper.php";
	
	if(isset($_POST["newPwd"])){
		$newpwd = $_POST["newPwd"];
	}
	
	if(isset($_POST["oldPwd"])){
		$oldPwd = $_POST["oldPwd"];
	}
	
	session_start();
	if(isset($_SESSION["s-email"])){
		$sqlresetPwd = "update server set password='$newpwd' where password='$oldPwd' and email='" . $_SESSION["s-email"] . "';";
		$result = excute($sqlresetPwd);
		
		if(count($result) > 0){
			echo '{"state":true,"message":"修改成功"}';
		}else{
			echo '{"state":false,"message":"修改失败"}';
		}
	}
		
?>