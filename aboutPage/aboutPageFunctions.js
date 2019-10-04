var numberOfMembers = 0;
var members = [];
var memberNames = {};//key value store
var mobileNavOpen = false;
var loadedMembers = false;

window.onload = function(){
	var learnMore = sessionStorage.getItem('learnMore');//if exists, then learn more button was pressed
	var workshopsPressed = sessionStorage.getItem('workshops');

	// console.log(learnMore);
	sessionStorage.clear();
	if(learnMore == '1'){
		//then learn more was pressed
		handleOurTeamClicked();

	}

	if(workshopsPressed == '1'){
		handleWorkshopsClicked();
	}

	handleLoadTeamMembers();

}

window.onresize = function(){
	handleTeamMembersResize();
}

function handleTeamMembersResize(){
	var mainView = document.getElementById("mainView");
	if(mainView.clientWidth >414){
		mainView.style.minHeight = ""+((Math.ceil(numberOfMembers/2))*300+400)+"px";
	}else{
		//if mainView client width is less than or equal to 414
		mainView.style.minHeight = ""+((numberOfMembers)*300+400+500)+"px";
	}
}

function handleClearProfile(){
	var profileDiv = document.getElementById("profileDiv");
	profileDiv.style.display = 'none';
}

function handleProfilePressed(){
	var fullName = this.getAttribute("fullName");
	var description = this.getAttribute("description");

	var profileDiv = document.getElementById("profileDiv");
	var profileName = document.getElementById("profileName");
	var profileDescription = document.getElementById("profileDescription");

	profileName.innerHTML = fullName;
	profileDescription.innerHTML = description;

	profileDiv.style.display = 'block';
	// console.log(this.index);
	window.scrollTo(0,0);
}

function handleOurMissionClicked(){
	console.log('handleClicked');
	var ourMissionH3 = document.getElementById("ourMissionH3");
	var ourTeamH3 = document.getElementById("ourTeamH3");
	var workshopH3 = document.getElementById("ourWorkshopsH3");
	var ourMissionElement = document.getElementById("missionPage");
	var teamPageElement = document.getElementById("teamPage");
	var mainView = document.getElementById("mainView");
	var workshopPageElement = document.getElementById("workshopsPage");

	ourMissionH3.style.color = '#ffcc00';
	ourTeamH3.style.color = 'black';
	workshopH3.style.color = 'black';
	mainView.style.minHeight = '1050px';
	// if(ourMissionElement.style.display == "none"){
	ourMissionElement.style.display = 'block';
	teamPageElement.style.display = 'none';
	workshopPageElement.style.display = 'none';
	// }
	// document.getElementById("ourMission").innerHTML = "Clicked";
}

function handleOurTeamClicked(){
	// console.log('handledTeamClicked');
		var ourTeamH3 = document.getElementById("ourTeamH3");
		var ourMissionH3 = document.getElementById("ourMissionH3");
		var workshopH3 = document.getElementById("ourWorkshopsH3");
		var ourMissionElement = document.getElementById("missionPage");
		var teamPageElement = document.getElementById("teamPage");
		var workshopPageElement = document.getElementById("workshopsPage");

		ourTeamH3.style.color = '#ffcc00';
		ourMissionH3.style.color = 'black';
		workshopH3.style.color = 'black';
		teamPageElement.style.display = 'block';
		ourMissionElement.style.display = 'none';
		workshopPageElement.style.display = 'none';

		if(!loadedMembers){
		// var numberOfMembers = 8;
		//adjust height for mainView
			var mainView = document.getElementById("mainView");
			if(mainView.clientWidth >414){
				mainView.style.minHeight = ""+((Math.ceil(numberOfMembers/2))*300+400)+"px";
			}else{
				//if mainView client width is less than or equal to 414
				mainView.style.minHeight = ""+((numberOfMembers)*300+400+500)+"px";
			}

			

			var memberListHTML = document.getElementById("memberList");
			console.log("number of members: "+numberOfMembers);
			//need to add each member to the memberList (new Li member);
			for(var i = 0;i<numberOfMembers;i++){
				var member = members[i];//member object: FullName, Position, Description
				// console.log(member);
				var fullName = member.fullName;
				var position = member.position;
				var description = member.description;
				var imageSource = member.imagePath;

				var li = document.createElement("li");//creates a new ListObject
				var image = document.createElement("img");//creates a new img objc
				var memberName = document.createElement("h3");
				var memberPosition = document.createElement("h3");

				
				li.className = "teamMember";
				image.className = "teamMemberImage";
				memberName.className = "memberName";
				memberPosition.className = "memberPosition";

				memberName.innerHTML = fullName;
				memberPosition.innerHTML = position;

				if(imageSource == "None"){
					image.src = "./images/defaultImage.jpg";
				}else{
					image.src = "./images/"+imageSource;
				}

				li.setAttribute("fullName", fullName);
				li.setAttribute("description", description);

				li.appendChild(image);
				li.appendChild(memberName);
				li.appendChild(memberPosition);

				li.onclick = handleProfilePressed;

				memberList.appendChild(li);
			}

			loadedMembers = true;
		}else{
			handleTeamMembersResize();
		}

}


function handleWorkshopsClicked(){
	var ourTeamH3 = document.getElementById("ourTeamH3");
	var ourMissionH3 = document.getElementById("ourMissionH3");
	var workshopH3 = document.getElementById("ourWorkshopsH3");
	var ourMissionElement = document.getElementById("missionPage");
	var teamPageElement = document.getElementById("teamPage");
	var workshopPageElement = document.getElementById("workshopsPage");

	ourTeamH3.style.color = 'black';
	ourMissionH3.style.color = 'black';
	workshopH3.style.color = '#ffcc00';
	teamPageElement.style.display = 'none';
	ourMissionElement.style.display = 'none';
	workshopPageElement.style.display = "block";

}



function handleLoadTeamMembers(){
	var http = new XMLHttpRequest();
	var url = 'http://scee.ucsc.edu:3000/loadActiveMembers';
	http.open('GET',url,true);
	// http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = function(){
		if(http.readyState == 4 && http.status == 200){
			// console.log("here");
			var htmlResponse = http.responseText;
			if(response == 'error'){
				alert("There was an error loading this, please try again later");
			}else{
				// console.log("got to json parsing");
				var response = JSON.parse(htmlResponse);
				// console.log(response);
				var membersArray = response.teamMembers;//array of teamMembers objects
				//loop through responses 
				// console.log(membersArray[0]);

				for(var i = 0;i<membersArray.length;i++){
					//go through each one the objects (team member objects)
					//save object into 
					members.push(membersArray[i]);//append each object to the members array
				}

				numberOfMembers = membersArray.length;
				console.log(numberOfMembers);
			}
		}
	}
	http.send(null);
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