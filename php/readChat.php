<?php
	$getfor = $_POST["for"];
	$getfrom = $_POST["from"];
	$isgroup = $_POST["isgroup"];
	$data = [];

	$link = mysqli_connect("127.0.0.1","root","","aiitchat");
	if($isgroup == 0){
		//Read messages that were not yet red
		$sql = "UPDATE messages SET rtime = CURRENT_TIMESTAMP, status = 1 WHERE $getfor = messages.fuser AND $getfrom = messages.tuser AND $isgroup = messages.isgroup AND messages.status IS NULL OR $getfrom = messages.fuser AND $getfor = messages.tuser AND $isgroup = messages.isgroup AND messages.status IS NULL;";
		$result = mysqli_query($link, $sql);
	}
	else if($isgroup == 1){
		//Read messages that were not yet red
		$sql = "UPDATE messages SET rtime = CURRENT_TIMESTAMP, status = 1 WHERE $getfrom = messages.tuser AND $isgroup = messages.isgroup AND messages.status IS NULL;";
		$result = mysqli_query($link, $sql);
	}
?>