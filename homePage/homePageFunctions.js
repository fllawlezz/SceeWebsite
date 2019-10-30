var counter = 0;
var slideIndex = 0;
var mobileNavOpen = false;
var timeout;

window.onload = function(){
	console.log('translated');
	
	carousel();
	setWhiteArrows();
}

window.onresize = function(){
	// console.log("resize");
	carousel();
	setWhiteArrows();
}

// Slideshow
function plusDivs(n) {
	clearTimeout(timeout);
	var x = document.getElementsByClassName("slideshowImage");
	for (i = 0; i < x.length; i++) {
	  x[i].style.opacity = 0;
	}
  
	slideIndex+= n;
	if (slideIndex > x.length) {slideIndex = 1}
	if (slideIndex < 1) {slideIndex = 3}
	x[slideIndex-1].style.display = "block"; 
	x[slideIndex-1].style.opacity = 1; 
    timeout = setTimeout(carousel, 4000);
}

function carousel() {
  clearTimeout(timeout);
  var i;
  var x = document.getElementsByClassName("slideshowImage");
  for (i = 0; i < x.length; i++) {
	x[i].style.opacity = 0;
  }

  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block"; 
  x[slideIndex-1].style.opacity = 1; 
  timeout = setTimeout(carousel, 4000);
}

function setWhiteArrows(){
	var container = document.getElementById("container");
	var prevArrow = document.getElementById("backButton");
	var nextArrow = document.getElementById("nextButton");
	if(container.clientWidth <=480){
		prevArrow.src = "./images/whiteLeft.png";
		nextArrow.src = "./images/whiteRight.png";
	}else{
		prevArrow.src = "./images/leftArrow.png";
		nextArrow.src = "./images/rightArrow.png";
	}
}

function handleLearnMorePressed(){
	sessionStorage.setItem('learnMore','1');
	location.href = "./aboutPage/AboutPage.html";
}

function handleWorkShopsPressed(){
	sessionStorage.setItem('workshops', '1');
	location.href = "./aboutPage/AboutPage.html";
}

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

function handleToBigIdeas() {
	window.location.href = "https://bigideascontest.org/";
}

function handleToSignUp(){
	window.location.href = "https://www.eventbrite.com/e/slug-tank-the-future-of-student-entrepreneurship-workshop-tickets-73707133019";
}









