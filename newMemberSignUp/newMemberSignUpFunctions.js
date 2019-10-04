
window.onload = function(){
	var textAreaHTML = document.getElementById('textArea');

	textAreaHTML.oninput = function(){
		console.log('on input');
		var wordCount = checkWordCount(textArea.value);
		if(wordCount > 160){
			alert('Your description must be no more than 160 words long');
		}else{
			var wordCountHTML = document.getElementById('wordCount');
			wordCountHTML.innerHTML = ""+wordCount+"/160";
		}
	}
}

function checkWordCount(str){
	return str.split(" ").length;
}

function isRunning(str){
	if(str == "yes"){
		return true;
	}else if(str == "no"){
		return false;
	}else{
		return null;
	}
}

function willBrandonNoticeThisShit(){
	return "Probably Not";
}

function isGoodLanguage(str){
	if(str == "Aaron uses it"){
		return false;
	}else{
		return true;
	}
}

function submitSignUp(){
	// alert("pressed");

	var textFields = document.getElementsByClassName("normalField");//array of textfields in order
	var descriptionField = document.getElementById("textArea");
	var fullNameField = textFields[0];
	var emailField = textFields[1];
	var positionField = textFields[2];


	// alert("passed everything");

	if(fullNameField.value.length == 0 || emailField.value.length == 0 || positionField.value.length == 0 || descriptionField.value.length == 0){
		alert("Please fill out all fields");
	}else{

		var wordCount = checkWordCount(textArea.value);

		if(wordCount > 160){
			alert("Please have your description less than 160 words. You have "+wordCount);
		}else if(wordCount < 60){
			alert("Please have your description at least 60 words. You have "+wordCount)
		}else{
			// alert("filled out all fields");

			var descriptionValueNonEscaped = descriptionField.value;
			var descriptionFieldEscaped = mysql_real_escape_string(descriptionValueNonEscaped);

			// console.log(descriptionValueOk);

			var http = new XMLHttpRequest();
			var url = 'http://scee.ucsc.edu:3000/newMemberSignup';
			var params = 'fullName='+fullNameField.value+'&email='+emailField.value+"&position="+positionField.value+"&description="+descriptionFieldEscaped;

			http.open('POST', url, true);

			//Send the proper header information along with the request
			http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			        // alert(http.responseText);
			        var response = http.responseText;
			        if(response == 'found'){
			        	//then alert that you signed up before
			        	console.log("found");
			        	alert("You are already signed up for our news letter");
			        }else if(response == 'error'){
			        	//error
			        	console.log("error");
			        	alert("There was an error... try again later!");
			        }else{
			        	//success
			        	console.log("success");
			        	alert("You have successfully signed Up!");
			        	window.location = "./index";
			        }
			    }
			}
			http.send(params);
		}
	}
}


function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}














