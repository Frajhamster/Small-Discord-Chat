<?php
	$username = $_POST["username"];
	$password = $_POST["password"];
	//Connect to database
	$link = mysqli_connect("127.0.0.1","root","","aiitchat");
	//SQL-command / SQL-Result
	$sql = "SELECT user.id as 'Id', user.name as 'Username', user.passwd as 'Password' FROM user;";
	$result = mysqli_query($link, $sql);
	$valid = [false];
	//Check if username exists
	while($row=mysqli_fetch_array($result))
	{
		if($row["Username"] == $username){
			if($row["Password"] == $password){
				$valid[0] = true;
				$valid[1] = $row["Id"];
				break;
			}
		}
	}

	echo json_encode($valid);
?>