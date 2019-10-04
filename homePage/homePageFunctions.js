var counter = 0;
var carouselImagesSizeWidth;
var mobileNavOpen = false;

window.onload = function(){
	console.log('translated');
	
	carouselSetup();
	setWhiteArrows();
}

window.onresize = function(){
	// console.log("resize");
	carouselSetup();
	setWhiteArrows();
}

function carouselSetup(){
	const carouselSlide = document.getElementById("carouselSlide");
	// const carouselImageSizeWidth = 1000;
	const carouselContainer = document.getElementById("carouselContainer");
	carouselImageSizeWidth = carouselContainer.clientWidth;
	// console.log(carouselImageSizeWidth);

	carouselSlide.style.transition = "none";
	carouselSlide.style.transform = "translateX(-"+(carouselImageSizeWidth * counter)+"px)";



	const nextButton = document.getElementById("nextButton");
	nextButton.removeEventListener("click", nextButtonFunction);	
	nextButton.addEventListener("click", nextButtonFunction);

	const backButton = document.getElementById("backButton");
	backButton.removeEventListener("click", prevButtonFunction);
	backButton.addEventListener("click", prevButtonFunction);
}

function nextButtonFunction(){
	if(counter < 2){
		carouselSlide.style.transition = 'transform 0.4s ease-in-out';
		counter++;
		console.log(counter);
		console.log("translateX(-"+(carouselImageSizeWidth * counter)+"px)");
		carouselSlide.style.transform = "translateX(-"+(carouselImageSizeWidth * counter)+"px)";
	}
}

function prevButtonFunction(){
	if(counter > 0){
		carouselSlide.style.transition = 'transform 0.4s ease-in-out';
		counter--;
		console.log(counter);
		console.log("translateX(-"+(carouselImageSizeWidth * counter)+"px)");
		carouselSlide.style.transform = "translateX(-"+(carouselImageSizeWidth*counter)+"px)";
		// carouselSlide.style.transform = "translateX(0px)";
	}
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

function handleToEvents(){
	location.href = "./eventsPage.html";
}

function handleToSignUp(){
	window.location.href = "https://www.eventbrite.com/e/design-your-life-workshop-with-dave-evans-tickets-61257674353";
}









