<?php
	session_start();
	if(isset($_SESSION["s-email"])){
		unset($_SESSION["s-email"]);
		echo '{"state":true}';
	}
?>