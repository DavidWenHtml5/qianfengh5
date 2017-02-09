<?php
	session_start();
    if(isset($_SESSION["s-email"])){
        echo '{"state": true, "account": "' . $_SESSION["s-email"] . '"}';
    } else {
        echo '{"state": false}';
    }
?>