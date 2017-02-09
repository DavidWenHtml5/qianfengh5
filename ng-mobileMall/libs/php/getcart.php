<?php
	include "DBHelper.php";
		
	if(isset($_GET["account"])){
		$getaccount = $_GET["account"];
	}
	
	if(isset($_GET["guid"])){
		$getguid = $_GET["guid"];
	}
	
	if(isset($_GET["select"])){
		$getselect = $_GET["select"];
	}
	
	if(isset($getaccount) && isset($getguid)){
		$checkSql = "select * from cart where account = '$getaccount' and guid = '$getguid';";
		$array = query($checkSql);
		
		if(count($array) > 0){	   		
	   		echo json_encode($array, JSON_UNESCAPED_UNICODE);			
	   	}else{
	        echo '{"state": false}'; 
	    }		
	}else if(isset($getaccount) && isset($getselect)){
		$checkSql = "select * from cart where account = '$getaccount' and proSelect = '$getselect';";
		$array = query($checkSql);
		
		if(count($array) > 0){	   		
	   		echo json_encode($array, JSON_UNESCAPED_UNICODE);			
	   	}else{
	        echo '{"state": false}'; 
	    }		
	}else{
		$checkSql = "select * from cart where account = '$getaccount';";
		$array = query($checkSql);
		
		if(count($array) > 0){	   		
	   		echo json_encode($array, JSON_UNESCAPED_UNICODE);			
	   	}else{
	        echo '{"state": false}';
	    }		
	}

?>