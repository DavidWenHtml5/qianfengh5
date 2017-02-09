<?php
	include "DBHelper.php";
	
	$email = $_POST["email"];
	$pwd = $_POST["password"];
	$phone = $_POST["phone"];

    //sql script可分为两类：1、逻辑型 2、查询型
	$sql = "insert into server(email, password, phone) values('$email', '$pwd', '$phone');";
    //sql 脚本 (sql script)
    $checkSql = "select * from server where email = '$email';";
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