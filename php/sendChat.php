<?php
	$from = $_POST["from"];
	$to = $_POST["to"];
	$message = $_POST["message"];
	$isgroup = $_POST["isgroup"];
	$link = mysqli_connect("127.0.0.1","root","","aiitchat");
	//Get users
	$sql = "INSERT INTO messages (fuser, tuser, message, isgroup) VALUES ($from,$to,'$message',$isgroup);";
	$result = mysqli_query($link, $sql);

	echo 1;
?>