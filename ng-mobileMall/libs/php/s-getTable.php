<?php
	include "DBHelper.php";
	
	if(isset($_GET["getTable"])){
    	$getTable = $_GET["getTable"];
   	}

    $checkSql = "select * from $getTable;";
	
    $array = query($checkSql);
    
    if(count($array) > 0){
    	echo json_encode($array, JSON_UNESCAPED_UNICODE);
    }
?>