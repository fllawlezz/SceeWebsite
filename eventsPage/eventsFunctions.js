var mobileNavOpen = false;

function submitSignUpRequest(){

	// console.log("submit");
	var eventNumber = 1;
	var fullNameField = document.getElementById("signUpNameField");
	var emailField = document.getElementById("signUpEmailField");
	var phoneField = document.getElementById("signUpPhoneField");

	if(fullNameField.value.length > 0 && emailField.value.length > 0){
		//then send
		var http = new XMLHttpRequest();
		var url = "http://scee.ucsc.edu:3000/signUpForEvent";
		var params = 'eventNumber='+eventNumber+'&fullName='+fullNameField.value+"&email="+emailField.value+"&phone="+phoneField.value;
		http.open("POST",url,true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.onreadystatechange = function(){
			if(http.readyState == 4 && http.status == 200){
				var response = http.responseText;
				if(response == 'success'){
					alert("You successfully signed up. We will contact you via email soon!");
					window.location = "./index";
				}else if(response == 'found'){
					alert("You already signed up for this event! Check your email for more info.");
					window.location = "./index";
				}else{
					alert("There was a problem signing up. Try again later");
					window.location = "./index";
				}
			}
		}
		http.send(params);

	}else{
		alert("Please fill out all required fields");
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