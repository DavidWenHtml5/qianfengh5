<?php
	include "DBHelper.php";
	
	if(isset($_POST["src"])){
		$src = $_POST["src"];
	}
		
	if(isset($_POST["title"])){
		$title = $_POST["title"];
	}
	
	if(isset($_POST["price"])){
		$price = $_POST["price"];
	}
	
	if(isset($_POST["guid"])){
		$guid = $_POST["guid"];
	}
	
	if(isset($_POST["delpro"])){
		$checkSql = "select * from products where guid = '$guid';";
    	$array = query($checkSql);
    	
    	if(count($array) > 0){
	    	$delSql = "delete from products where guid = '$guid';";
	    	$result = excute($delSql);
	        if($result){
	            echo '{"state": true}';
	        } else {
	            echo '{"state": false, "message": "删除失败"}';
	        }        
	    }else{
	        echo '{"state": false, "message": "该商品已被删除！"}';    
	    }
	}else{
		$sql = "insert into products(src, title, price,guid) values('$src', '$title', '$price', '$guid');";
	    $result = excute($sql);
	    
	    if($result){
	        echo '{"state": true,"message":"添加成功！"}';
	    } else {
	        echo '{"state": false, "message": "添加失败"}';
	    }  
	}
	
?>