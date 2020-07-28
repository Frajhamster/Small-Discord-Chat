<?php
	$getfor = $_POST["getfor"];
	$getfrom = $_POST["getfrom"];
	$isgroup = $_POST["isgroup"];

	$link = mysqli_connect("127.0.0.1","root","","aiitchat");
	if($isgroup == 0){
		//Get all messages from certain chat
		$sql = "SELECT user.name as 'Name', messages.message as 'Msg', messages.stime as 'Time' FROM messages, user WHERE $getfor = messages.fuser AND $getfrom = messages.tuser AND $isgroup = messages.isgroup AND messages.fuser = user.id OR $getfrom = messages.fuser AND $getfor = messages.tuser AND $isgroup = messages.isgroup AND messages.fuser = user.id;";
		$result = mysqli_query($link, $sql);
		$data = [];
		$i = 0;
		while($row=mysqli_fetch_array($result)){
			$data[$i][0] = $row["Name"];
			$data[$i][1] = $row["Msg"];
			$data[$i][2] = $row["Time"];
			$i++;
		}
		if($i == 0){
			$data[0][0] = 0;
			$data[0][1] = "This chat is empty";
		}
	}
	else if($isgroup == 1){
		//Get all messages from certain chat
		$sql = "SELECT user.name as 'Name', messages.message as 'Msg', messages.stime as 'Time' FROM messages, user, groupsuser WHERE $getfrom = messages.tuser AND $isgroup = messages.isgroup AND $getfor = groupsuser.userid AND $getfrom = groupsuser.groupid AND user.id = messages.fuser;";
		$result = mysqli_query($link, $sql);
		$data = [];
		$i = 0;
		while($row=mysqli_fetch_array($result)){
			$data[$i][0] = $row["Name"];
			$data[$i][1] = $row["Msg"];
			$data[$i][2] = $row["Time"];
			$i++;
		}
		if($i == 0){
			$data[0][0] = 0;
			$data[0][1] = "This chat is empty";
			$sql = "SELECT groupsuser.userid FROM groupsuser WHERE $getfor = groupsuser.userid AND $getfrom = groupsuser.groupid;";
			$result = mysqli_query($link, $sql);
			while($row=mysqli_fetch_array($result)){
				$i++;
			}
			if($i == 0){
				$data[0][1] = "You are not in this chat group!";
			}
		}
	}
	
	echo json_encode($data);
?>