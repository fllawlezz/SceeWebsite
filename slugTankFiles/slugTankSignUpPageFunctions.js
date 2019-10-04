var numberOfMembers = 0;

window.onload = function(){
	var addTeamMemberLi = document.getElementById("addTeamMemberButton");
	addTeamMemberLi.onclick = handleAddTeamMember;

	var newMemberNameField = document.getElementById("newMemberNameField");
	newMemberNameField.addEventListener("keydown", function(event){
		if(event.keyCode == 13){
			appendTeamMember();
		}
	});
}


function handleCancelAddMember(){
	var addMemberDiv = document.getElementById("addMemberDiv");
	var newMemberNameField = document.getElementById("newMemberNameField");

	newMemberNameField.value = "";
	addMemberDiv.style.transition = "display 0.3s linear 0s";
	// addMemberDiv.style.opacity = '0';
	addMemberDiv.style.display = "none";
}

function handleAddTeamMember(){
	console.log("add team member");
	var addMemberDiv = document.getElementById("addMemberDiv");

	addMemberDiv.style.transition = "display 0.3s linear 0s";
	// addMemberDiv.style.opacity = '0';
	addMemberDiv.style.display = "block";

	window.scrollTo(0,0);
}

function appendTeamMember(){
	var newMemberName = document.getElementById("newMemberNameField").value;
	var memeberList = document.getElementById("teamMembersList");
	if(newMemberName.length > 2){
		var li = document.createElement("li");
		var memberName = document.createElement("h3");
		var minusButton = document.createElement("img");

		li.className = "teamMembers";
		memberName.className = "teamMemberName";
		minusButton.className = "redMinus";

		memberName.innerHTML = newMemberName;
		minusButton.src = "./images/redMinus.png"

		li.setAttribute("memberName", newMemberName);
		li.appendChild(memberName);
		li.appendChild(minusButton);

		minusButton.setAttribute("memberNumber", numberOfMembers);

		minusButton.onclick = removeMember;

		memeberList.insertBefore(li, memeberList.childNodes[0]);
		//also save the names in an array to submit
		numberOfMembers++;

		handleCancelAddMember();
	}else{
		alert("Please enter your team member's name");
	}

	

}

function removeMember(){
	var memberNumber = this.getAttribute("memberNumber");
	var listItem = this.parentElement;
	console.log(memberNumber);
	var memberList = document.getElementById("teamMembersList");
	memberList.removeChild(listItem);
}


function submitForm(){

	var formData = new FormData();

	// getFiles();
	// var videoFile = getVideoFile();
	// var presentationFile = getPresentationFile();

	var memberNames = [];//array of member names

	var memberList = document.getElementById("teamMembersList");
	var members = memberList.getElementsByTagName("li");
	//loop through all of the UL and get their attributes and append to an array
	for(var i = 0;i<members.length-1;i++){
		console.log(members[i].getAttribute("memberName"));
		memberNames.push(members[i].getAttribute("memberName"));
	}
	
	// console.log(memberNames);

	// get the name and one sentence description
	var projectName = document.getElementById("projectNameField").value;
	var projectDescription = document.getElementById("projectDescriptionField").value;
	var projectEmail = document.getElementById("emailField").value;

	// console.log(projectEmail);

	if(projectName.length > 0 && projectDescription.length > 9 && memberNames.length > 0 && projectEmail.length > 2){
		// formData.append("memberNames",JSON.stringify(memberNames));
		var memberDataObject = {groupMembers: memberNames};
		console.log(memberDataObject);
		formData.append("memberNames",JSON.stringify(memberDataObject));


		// formData.append("videoFile",videoFile,""+videoFile.name);
		// formData.append("presentationFile", presentationFile, ""+presentationFile.name);

		formData.append("projectName", projectName);
		formData.append("projectDescription", projectDescription);
		formData.append("email", projectEmail);

		var http = new XMLHttpRequest();
		var url = 'http://scee.ucsc.edu:3000/slugTankSignUp';
		http.open('POST',url,true);
		// var url = 'http://localhost:3000/slugTankSignUp';
		http.onreadystatechange = function() {//Call a function when the state changes.

		    if(http.readyState == 4 && http.status == 200) {
		        alert(http.responseText);
		        var response = http.responseText;
		        console.log(response);
		        if(response == 'success'){
		        	//then alert that you signed up before
		        	console.log("success");
		        	alert("Congratulations! You have signed up! We will contact you soon for more details!");
		        	window.location = "./slugTank";
		        }else if(response == 'error'){
		        	//error
		        	console.log("error");
		        	alert("There was an error submitting your application. Please try again later");
		        	window.location = "./slugTank";
		        }else{
		        	//success
		        	console.log("error");
		        	alert("There was an error submitting your application. Please try again later");
		        	window.location = "./slugTank";
		        }
		    }
		}


		
		http.send(formData);

	}else{
		if(memberNames.length < 1){
			alert("Please add at least one member to your group");
		}else if(projectName.length < 1){
			alert("Please fill out your projectName");
		}else if(projectDescription.length < 9){
			alert("Please fill out your project Description. It must be at least 10 characters long");
		}else if(projectEmail.length < 2){
			alert("Please fill out your Email");
		}else if(videoFile == null){
			alert("Please select your 1-2 minute video description file");
		}else if(presentationFile == null){
			alert("please select your 4-5 slide presentation file");
		}else{
			alert("Fill out all forms and select your files");
			return;
		}
	}

}

function getVideoFile(){
	console.log("getVideoFile");
	const videoFile = document.getElementById("videoFileButton");
	const file = videoFile.files[0];
	// console.log(file.name);

	if(file == null){
		return null
	}

	return file;

}

function getPresentationFile(){
	const presentationFile = document.getElementById("presentationFileButton");
	const file = presentationFile.files[0];
	if(file == null){
		return null;
	}
	return file;
}


function getFiles(){
	const videoFile = document.getElementById("videoFileButton");
	const presentFileButton = document.getElementById("presentationFileButton");

	const formData = new FormData();

	// console.log(videoFile.files[0].filename);
	for(const file of videoFile.files){
		console.log(file.name);
	}

	formData.append("myFiles[]", videoFile.files[0]);

	// console.log(formData);
}





















