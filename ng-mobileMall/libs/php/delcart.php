<?php
	include "DBHelper.php";
	
	if(isset($_POST["account"])){
		$account = $_POST["account"];
	}
	
	if(isset($_POST["guid"])){
		$guid = $_POST["guid"];
	}
	
	if(isset($_POST["date"])){
		$date = $_POST["date"];
	}
		
    $checkSql = "select * from cart where account = '$account' and guid = '$guid';";
    $array = query($checkSql);
    
    if(count($array) > 0){
    	$delSql = "delete from cart where account = '$account' and guid = '$guid';";
    	$result = excute($delSql);
        if($result){
            echo '{"state": true}';
        } else {
            echo '{"state": false, "message": "删除失败"}';
        }        
    }else{
        echo '{"state": false, "message": "该商品为空！"}';    
    }	
?>