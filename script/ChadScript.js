var credentials = [undefined, undefined];
var loggedin = false;
var sendto = [undefined, undefined];
var allmessages = 0;
var interval1;

//Registration
function checkRegistrationUsername(username, hashed){
	//Check username length
	if(username.length < 3 || username.length > 15){
		return false;
	}
	//Check for spaces in username
	if(/\s/.test(username)){
		return false;
	}
	//Check for strange characters in username
	if(!(/^[a-zA-Z0-9_.-]*$/.test(username))){
		return false;
	}
	//Check if username already exists
	$.post("php/register.php", {username: username, password: hashed}, function(data){
		var parsedData = JSON.parse(data);
		if(parsedData[0] == false){
			$("input[id='rusername']").val("");
			$("input[id='rpassword']").val("");
		}
		else{
			return false;
		}
	});
	return true;
}
function checkRegistrationPassword(password){
	//Check password length
	if(password.length < 5 || password.length > 16){
		return false;
	}
	//Check for spaces in password
	if(/\s/.test(password)){
		return false;
	}
	//Check for strange characters in password
	if(!(/^[a-zA-Z0-9_.-]*$/.test(password))){
		return false;
	}
	//Check for at least 1 number
	if(!(/\d/.test(password))){
		return false;
	}
	return true;
}

//Login
function checkLoginCredentials(username, hashed){
	//PHP-Request
	$.post("php/login.php", {username: username, password: hashed}, function(data){
		var parsedData = JSON.parse(data);
		if(parsedData[0] == true){
			//Save currently logged in username in array
			credentials[0] = username;
			//Save currently logged in ID (ID is in DB)
			credentials[1] = parsedData[1];
			//loggedin marked as true (May need later) - Unused
			loggedin = true;
			//Clear input fields
			$("input[id='lusername']").val("");
			$("input[id='lpassword']").val("");
			//Hide register and login elements
			$("div[id='rlpage']").css("display","none");
			//Show chat elements
			$("div[id='chatpage']").css("display","block");
			getGroupsAndUsers();
		}
	});
}


$("button[id='rsubmit']").click(function(){
	//Get username from register window
	var username = $("input[id='rusername']").val();
	//Get password from register window
	var password = $("input[id='rpassword']").val();
	//Validation (Password)
	if(!(checkRegistrationPassword(password)))
		return false;
	//Hash password
	var hashed = sha256(password);
	//Validation (Username)
	checkRegistrationUsername(username, hashed);
});//When button "Register" is pressed

$("button[id='lsubmit']").click(function(){
	//Get username from login window
	var username = $("input[id='lusername']").val();
	//Get password from login window
	var password = $("input[id='lpassword']").val();
	//Hash password
	var hashed = sha256(password);
	//Validation (Username & Password)
	checkLoginCredentials(username, hashed);
});//When button "Login" is pressed



function getGroupsAndUsers(){
	//PHP-Request
	$.get("php/getGroupsUser.php", function(data){
		var parsedData = JSON.parse(data);
		//For each user
		for(var j = 0; j < parsedData[0][0].length; j++){
			//If it is not you who logged in
			if(credentials[0] != parsedData[0][1][j])
				//Add the user to the selection list
				$("select[id='users']").append(new Option(parsedData[0][1][j], parsedData[0][0][j]));
		}
		//For each group
		for(var j = 0; j < parsedData[1][0].length; j++){
			//Add the group to the selection list
			$("select[id='groups']").append(new Option(parsedData[1][1][j], parsedData[1][0][j]));
		}
	});
}//Display available groups and users

function refresh(data){
	//If there is at least 1 message in certain chat window
	if(data[0][0] != 0){
		$("input").prop("disabled", false);
		//For each new message
		for(var i = allmessages; i < data.length; i++){
			//Add new message as <p> tag with: Date, Name and Message
			$("div[id='textbox']").append("<p>["+data[i][2]+']  '+data[i][0]+':  '+data[i][1]+"</p>");
		}
		//Auto-Scroll to the bottom of the chat
		$("div[id='textbox']").animate({scrollTop:$("div[id='textbox']")[0].scrollHeight}, 250);
		allmessages = data.length;
	}
	//If there are no messages
	else if($("div[id='textbox']").children().length == 0){
		//If it is a user chat
		if(sendto[1] == 0){
			//Tell that there are no messages
			$("div[id='textbox']").append("<p>"+data[0][1]+"</p>");
			$("input").prop("disabled", false);
		}
		//If it is a group chat and user does not belong to this group chat
		else if(sendto[1] == 1 && data[0][1] == "You are not in this chat group!"){
			//Tell that user doesnt belong to that group chat
			$("div[id='textbox']").append("<p>"+data[0][1]+"</p>");
			//Disable input field for this group chat
			$("input").prop("disabled", true);
		}
		//If it is a group chat
		else if(sendto[1] == 1){
			//Enable input field
			$("input").prop("disabled", false);
			//Tell that there are no messages
			$("div[id='textbox']").append("<p>"+data[0][1]+"</p>");
		}
	}
}//Adds new messages to the chat window for a user or a group

function getMessages(){
	//PHP-Request
	$.post("php/getChat.php", {getfor: parseInt(credentials[1]), getfrom: parseInt(sendto[0]), isgroup: sendto[1]}, function(data){
		var parsedData = JSON.parse(data);
		//If there are new messages
		if(parsedData.length > allmessages){
			refresh(parsedData);
		}
	});
}//Get all messages for specific chat or group

//Only send to group OR user --- Safety Mechanism
$("select[id='users']").change(function(){
	clearInterval(interval1);
	$("select[id='groups']").val("-----");
	//Id from user to send message to
	sendto[0] = $("select[id='users']").val();
	//Chat is a user
	sendto[1] = 0;
	set1();
});//Send to user
$("select[id='groups']").change(function(){
	clearInterval(interval1);
	$("select[id='users']").val("-----");
	//Id from group to send message to
	sendto[0] = $("select[id='groups']").val();
	//Chat is a group
	sendto[1] = 1;
	set1();
});//Send to group
function set1(){
	//If user or group is selected
	if(sendto[0] != "-----"){
		allmessages = 0;
		$("div[id='textbox']").empty();
		$("input[id='message']").val("");
		getMessages();
		interval1 = setInterval(getMessages, 1000);
	}
	else
		$("div[id='textbox']").empty();
}//Set values before switching chat

//When send-message button is clicked
$("button[id='send']").click(function(){
	//Take message
	var message = $("input[id='message']").val();
	//Empty the input field
	$("input[id='message']").val("");
	//If there is message
	if(message != ""){
		//PHP-Request --- Add message to the DB
		$.post("php/sendChat.php", {from: parseInt(credentials[1]), to: parseInt(sendto[0]), message: message, isgroup: sendto[1]}, function(data){
			getMessages();
		});
	}
});
//When input for message is clicked (Mark as read)
$("input[id='message']").on("focus", function(){
	//PHP-Request
	$.post("php/getChat.php", {getfor: parseInt(credentials[1]), getfrom: parseInt(sendto[0]), isgroup: sendto[1]}, function(data){
		var parsedData = JSON.parse(data);
		//If last message is not from the logged in user
		if(parsedData[parsedData.length - 1][0] != credentials[0]){
			//Mark messages as "read" (status = 1)
			$.post("php/readChat.php", {for: parseInt(credentials[1]), from: parseInt(sendto[0]), isgroup: sendto[1]}, function(){});
		};
	});
});