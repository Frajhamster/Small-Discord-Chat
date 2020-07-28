<?php
	$link = mysqli_connect("127.0.0.1","root","","aiitchat");
	//Get users
	$sql = "SELECT user.name as 'Username', user.id as 'Id' FROM user;";
	$result = mysqli_query($link, $sql);
	$data = [];
	$i = 0;
	while($row = mysqli_fetch_array($result)){
		$data[0][0][$i] = $row["Id"];
		$data[0][1][$i] = $row["Username"];
		$i++;
	}
	//Get groups
	$sql = "SELECT groups.name as 'Group', groups.id as 'Id' FROM groups;";
	$result = mysqli_query($link, $sql);
	$i = 0;
	while($row = mysqli_fetch_array($result)){
		$data[1][0][$i] = $row["Id"];
		$data[1][1][$i] = $row["Group"];
		$i++;
	}
	echo json_encode($data);
?>