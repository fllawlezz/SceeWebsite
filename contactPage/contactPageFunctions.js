var mobileNavOpen = false;

function submitSubscribe(){
	var subscribeDescription = document.getElementById("subscribeDescription");
	var spamDescription = document.getElementById("spamDescription");
	var firstName = document.getElementById("firstNameField");
	var lastName = document.getElementById("lastNameField");
	var email = document.getElementById("emailField");
	var submitButton = document.getElementById("signUpButton");
	var thankyouMessage = document.getElementById("subscribedMessage");

	if(firstName.value.length > 0 && lastName.value.length > 0 && email.value.length > 0){
		console.log("subscribe");
		var http = new XMLHttpRequest();
		var url = 'http://scee.ucsc.edu:3000/emailSignUp';
		var params = 'firstName='+firstName.value+'&lastName='+lastName.value+'&email='+email.value;
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
		        	// console.log("success");
		        	// alert("You have successfully subscribed!");
		        	subscribeDescription.style.display = "none";
		        	spamDescription.style.display = "none";
		        	firstName.style.display = "none";
		        	lastName.style.display = "none";
		        	email.style.display = "none";
		        	submitButton.style.display = "none";
		        	thankyouMessage.style.display = "block";

		        }
		    }
		}
		http.send(params);
	}else{
		alert("Please fill out the forms");
	}
}

function handeMobileNav(){
	var slideInMenu = document.getElementById("slideInMenu");
	var darkView = document.getElementById("darkView");
	var hamburgerButton = document.getElementById("hamburgerButton");

	if(!mobileNavOpen){
		hamburgerButton.src = "./images/clear.png";

		slideInMenu.style.transition = "0.4s";
		slideInMenu.style.height = '200px';

		darkView.style.transition = "0.4s";
		darkView.style.display = "block";

		mobileNavOpen = true;
	}else{
		hamburgerButton.src = "./images/hamburger.png";

		slideInMenu.style.height = '0px';
		darkView.style.display = 'none';

		mobileNavOpen = false;
	}
	
}

function submitContactRequest(){
	var contactName = document.getElementById("contactNameField");
	var contactEmail = document.getElementById("contactEmailField");
	var textArea = document.getElementById("textArea");

	if(contactName.value.length > 0 && contactEmail.value.length > 0 && textArea.value.length > 0){
		var http = new XMLHttpRequest();
		var url = "http://scee.ucsc.edu:3000/newContactRequest";
		var mysqlDescription = mysql_real_escape_string(textArea.value);
		var params = "fullName="+contactName.value+"&email="+contactEmail.value+"&description="+mysqlDescription;
		http.open('POST', url, true);

		//Send the proper header information along with the request
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function(){
			if(http.readyState == 4 && http.status == 200){
				var response = http.responseText;
				if(response == 'success'){
					//show the success h1
					alert("Success! We will get back to you within 1-2 business days!");
					window.location = "./index";
				}else{
					console.log('error');
					alert('there was an error... try again later');
				}
			}
		}
		http.send(params);
	}else{
		alert("Please fill out all forms");
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












