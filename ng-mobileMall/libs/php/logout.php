<?php
	session_start();
	if(isset($_SESSION["account"])){
		unset($_SESSION["account"]);
		echo '{"state":true}';
	}
?>