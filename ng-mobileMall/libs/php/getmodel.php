<?php
    include 'DBHelper.php';

    $sql = "select * from tmodel;";

    $result = query($sql);
    
    if(count($result) > 0){
    	echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
?>