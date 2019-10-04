var mobileNavOpen = false;

function submitSubscribe(){
	console.log('submit');
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