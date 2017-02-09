<?php
	include "DBHelper.php";
		
	$account = $_POST["account"];
	
	if(isset($_POST["src"])){
		$src = $_POST["src"];
	}
		
	if(isset($_POST["title"])){
		$title = $_POST["title"];
	}
	
	if(isset($_POST["price"])){
		$price = $_POST["price"];
	}	
	
	if(isset($_POST["number"])){
		$number = $_POST["number"];
	}	
	
	if(isset($_POST["date"])){
		$date = $_POST["date"];
	}else{
		$date = date("Y-m-d");
	}
	
	if(isset($_POST["guid"])){
		$guid = $_POST["guid"];
	}
	
	if(isset($_POST["select"])){
		$select = $_POST["select"];
	}
	
	if(isset($_POST["allselect"])){
		$allselect = $_POST["allselect"];
	}
	
	if(isset($allselect)){
		$checkSql = "select * from cart where account = '$account';";
    
    	$array = query($checkSql);
    	
    	if(count($array) > 0){
    		$sqlnumber = "update cart set proSelect='$allselect' where account='$account';";
			$result = excute($sqlnumber);
			
			if(count($result) > 0){
				echo '{"state": true,"message":"修改成功！"}';
			}else{
				echo '{"state":false,"message":"修改失败！"}';
			}		
    	}
	}else if(isset($select) && isset($guid)){
		$checkSql = "select * from cart where account = '$account' and guid = '$guid';";
    
    	$array = query($checkSql);
    	
    	if(count($array) > 0){
    		$sqlnumber = "update cart set proSelect='$select' where guid='$guid' and account='$account';";
			$result = excute($sqlnumber);
			
			if(count($result) > 0){
				echo '{"state": true,"message":"修改成功！"}';
			}else{
				echo '{"state":false,"message":"修改失败！"}';
			}		
    	}
	}else if(isset($guid)){
	    $checkSql = "select * from cart where account = '$account' and guid = '$guid';";
	    
	    $array = query($checkSql);
	    
	    if(count($array) > 0 && isset($number)){
	    	
			$sqlnumber = "update cart set number='$number' where guid='$guid' and account='$account';";
			$result = excute($sqlnumber);
			
			if(count($result) > 0){
				echo '{"state": true,"message":"修改成功！"}';
			}else{
				echo '{"state":false,"message":"修改失败！"}';
			}		
	    }else{
	    	$sql = "insert into cart(account, src, title, price, buydate,guid) values('$account', '$src',  '$title', '$price','$date','$guid');";
	        $result = excute($sql);
	        if($result){
	            echo '{"state": true,"message":"添加成功！"}';
	        } else {
	            echo '{"state": false, "message": "添加失败"}';
	        }        
	    }
    }	
?>