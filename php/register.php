<?php
	$username = $_POST["username"];
	$password = $_POST["password"];
	//Connect to database
	$link = mysqli_connect("127.0.0.1","root","","aiitchat");
	//SQL-command / SQL-Result
	$sql = "SELECT user.name as 'Username' FROM user;";
	$result = mysqli_query($link, $sql);
	$exists = [false];
	while($row=mysqli_fetch_array($result))
	{
		if($row["Username"] == $username){
			$exists[0] = true;
			break;
		}
	}
	if($exists[0] == false){
		$sql = "INSERT INTO user (name, passwd) VALUES ('$username','$password');";
		$result = mysqli_query($link, $sql);
	}
	if(!$result)
	{
		$exists[1] = mysqli_error($link);
		$exists[0] = true;
	}
	echo json_encode($exists);
?>