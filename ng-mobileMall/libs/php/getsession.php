<?php
	session_start();
	if(isset($_SESSION["account"])){
		echo '{"state":true,"message":"' . $_SESSION["account"] . '"}';
	}else{
		echo '{"state":false}';
	}
?>