<?php
	include "DBHelper.php";
	
	session_start();
	
	$sqlresetPwd = "update user set password='" . $_POST["newPwd"] . "' where password='" . $_POST["oldPwd"] . "' and account='" . $_SESSION["account"] . "';";
	$result = excute($sqlresetPwd);
	
	if(count($result) > 0){
		echo '{"state":true,"message":"修改成功"}';
	}else{
		echo '{"state":false,"message":"修改失败"}';
	}
?>