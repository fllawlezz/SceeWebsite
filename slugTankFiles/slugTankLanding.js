function handleToSignUpPage(){
	var projectNameField = document.getElementById("projectNameField");
	var projectDescriptionField = document.getElementById("projectDescriptionField");

	if(projectNameField.value.length < 1 || projectDescriptionField.value.length < 5){
		//show error
		alert("Please fill out the forms to continue");
	}else{
		//go to next page
		location.href = "slugTankSignUpPage.html";
	}
}	

