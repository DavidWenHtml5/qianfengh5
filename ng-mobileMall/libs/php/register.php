<?php
include "DBHelper.php";
	
	$account = $_POST["account"];
	$email = $_POST["email"];
	$pwd = $_POST["password"];
	$phone = $_POST["phone"];

	$sql = "insert into user(email, password, phone,account) values('$email', '$pwd', '$phone','$account');";

    $checkSql = "select * from user where email = '$email';";
    $array = query($checkSql);
    if(count($array) > 0){
        echo '{"state": false, "message": "email already exists!"}';
    } else{
        $result = excute($sql);
        if($result){
            echo '{"state": true}';
        } else {
            echo '{"state": false, "message": "register fail!"}';
        }        
    }	
?>