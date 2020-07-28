var credentials = [undefined, undefined];
var loggedin = false;

//Registration
function checkRegistrationUsername(username, hashed){
	//Check username length
	if(username.length < 5 || username.length > 15){
		$("p[name='text_registererror']").css("display","block");
		$("p[name='text_registererror']").html("Registration failed:<br>Username length: 5-15");
		return false;
	}
	//Check for spaces in username
	if(/\s/.test(username)){
		$("p[name='text_registererror']").css("display","block");
		$("p[name='text_registererror']").html("Registration failed:<br>Username contains SPACES");
		return false;
	}
	//Check for strange characters in username
	if(!(/^[a-zA-Z0-9_.-]*$/.test(username))){
		$("p[name='text_registererror']").css("display","block");
		$("p[name='text_registererror']").html("Registration failed:<br>Username contains unknown characters");
		return false;
	}
	//Check if username already exists
	$.post("php/register.php", {username: username, password: hashed}, function(data){
		var parsedData = JSON.parse(data);
		console.log(parsedData);
		if(parsedData[0] == false){
			$("p[name='text_registererror']").css("display","none");
			$("input[name='username_register']").val("");
			$("input[name='password_register']").val("");
			$("input[name='checkbox_humancheck']").prop("checked", false);
			$("h4[name='text_registersuccess']").css("display","block");
			setTimeout(function(){
				$("h4[name='text_registersuccess']").css("display","none");
			}, 2000);
		}
		else{
			$("p[name='text_registererror']").css("display","block");
			$("p[name='text_registererror']").html("Registration failed:<br>Username already exists");
			return false;
		}
	});
	
	return true;
}
function checkRegistrationPassword(password){
	//Check password length
	if(password.length < 8 || password.length > 16){
		$("p[name='text_registererror']").css("display","block");
		$("p[name='text_registererror']").html("Registration failed:<br>Password length: 8-16");
		return false;
	}
	//Check for spaces in password
	if(/\s/.test(password)){
		$("p[name='text_registererror']").css("display","block");
		$("p[name='text_registererror']").html("Registration failed:<br>Password contains SPACES");
		return false;
	}
	//Check for strange characters in password
	if(!(/^[a-zA-Z0-9_.-]*$/.test(password))){
		$("p[name='text_registererror']").css("display","block");
		$("p[name='text_registererror']").html("Registration failed:<br>Password contains unknown characters");
		return false;
	}
	//Check for at least 1 number
	if(!(/\d/.test(password))){
		$("p[name='text_registererror']").css("display","block");
		$("p[name='text_registererror']").html("Registration failed:<br>Password must contain 1 number");
		return false;
	}
	
	return true;
}
function checkHumanCheckbox(){
	//Check if human checkbox is checked
	if(!($("input[name='checkbox_humancheck']").is(":checked"))){
		$("p[name='text_registererror']").css("display","block");
		$("p[name='text_registererror']").html("Registration failed:<br>You are not human");
		return false;
	}
	return true;
}

//Login
function checkLoginCredentials(username, hashed){
	$.post("php/login.php", {username: username, password: hashed}, function(data){
		var parsedData = JSON.parse(data);
		if(parsedData[0] == true){
			credentials[0] = username;
			//User ID in DB
			credentials[1] = parsedData[1];
			loggedin = true;
			$("p[name='text_loginerror']").css("display","none");
			$("div[name='loginpage']").css("display","none");
			$("div[name='userdata']").css("display","block");
			$("input[name='username_login']").val("");
			$("input[name='password_login']").val("");
			showHistory();
		}
		else{
			$("p[name='text_loginerror']").css("display","block");
		}
	});
}

//Get data from DB
function showHistory(){
	$("h2[name='text_loggedinas']").html("Welcome " + credentials[0] +"!");
	$.post("php/getuserdata.php", {userid: credentials[1]}, function(data){
		var parsedData = JSON.parse(data);
		$("tbody[name='tabledata']").html(parsedData[0]);
	});
}
//Add data to DB
function saveData(datenow, datelater, location, hours){
	$.post("php/senduserdata.php", {userid: credentials[1], datenow: datenow, datelater: datelater, location: location, hours: hours}, function(data){
		showHistory();
	});
}


//When button "Search" is pressed do this
$("button[name='searchbutton']").click(function(){
	var datenow = $("input[name='timefrom']").val();
	var datelater = $("input[name='timeto']").val();
	var locationlatitude = $("select[name='location']").val();
	var location = $("select[name='location']").find(":selected").html();
	$.post("php/calculate.php", {datenow: datenow, datelater: datelater, latitude: locationlatitude}, function(data){
		var parsedData = JSON.parse(data);
		$("h3[name='textfield_days']").html(parsedData[0]);
		$("h3[name='textfield_hours']").html(parsedData[1]);
		$("h3[name='textfield_minutes']").html(parsedData[2]);
		$("h3[name='textfield_seconds']").html(parsedData[3]);
		$("div[name='progress_days']").css("width", parsedData[4] + "%");
		$("div[name='progress_hours']").css("width", parsedData[5] + "%");
		$("div[name='progress_minutes']").css("width", parsedData[6] + "%");
		$("div[name='progress_seconds']").css("width", parsedData[7] + "%");
		if(loggedin == true){
			saveData(datenow, datelater, location, parsedData[8]);
		}
	});
});

//When button "Register" is pressed do this
$("button[name='registerbutton']").click(function(){
	var username = $("input[name='username_register']").val();
	var password = $("input[name='password_register']").val();
	//Validation (Username & Password)
	if(!(checkHumanCheckbox()))
		return false;
	if(!(checkRegistrationPassword(password)))
		return false;
	var hashed = sha256(password);
	checkRegistrationUsername(username, hashed);
});

//When button "Login" is pressed do this
$("button[name='loginbutton']").click(function(){
	var username = $("input[name='username_login']").val();
	var password = $("input[name='password_login']").val();
	//Validation (Username & Password)
	var hashed = sha256(password);
	checkLoginCredentials(username, hashed);
});

//When button "Logout" is pressed do this
$("button[name='logoutbutton']").click(function(){
	loggedin = false;
	credentials[0] = undefined;
	credentials[1] = undefined;
	$("div[name='userdata']").css("display","none");
	$("div[name='loginpage']").css("display","block");
});