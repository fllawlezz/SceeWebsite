const express = require('express');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const router = express.Router();
router.use(fileUpload());


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Terra51197',
    database: 'ClubWebsite',
    multipleStatements: true,
    charset: 'utf8mb4'
});

router.post("/slugTankSignUp", (req,res)=>{
	// console.log("slugTankSignUp");

	var memberNames = req.body.memberNames;
	// console.log(memberNames);

	var projectName = req.body.projectName;//string
	var projectDescription = req.body.projectDescription;
	var projectEmail = req.body.email;

	// console.log(projectEmail);


	// var file = req.files.videoFile;
	// var presentationFile = req.files.presentationFile;

	// console.log(file.name);

	// const folderName = "./slugTankApplicationFiles/"+projectName;

			// console.log("doesnot exist");
	// fs.mkdir(""+folderName, function(){
	// 	file.mv("./slugTankApplicationFiles/"+projectName+"/"+file.name, function(err){
	// 		if(err){
	// 			console.log(err);
	// 			res.write('error');
	// 			res.end();
	// 			return;
	// 		}else{
	// 			console.log("successfully moved video");
	// 		}
	// 	})

	// 	presentationFile.mv("./slugTankApplicationFiles/"+projectName+"/"+presentationFile.name, function(err){
	// 		if(err){
	// 			console.log(err);
	// 			res.write('error');
	// 			res.end();
	// 			return;
	// 		}else{
	// 			console.log("successfully moved video");
	// 		}
	// 	})

	// })

	var query = "INSERT INTO SlugTankSignUps(ProjectName, ProjectDescription, Email) VALUES ('"+projectName+"','"+projectDescription+"','"+projectEmail+"');SELECT LAST_INSERT_ID();";
	con.query(query, function(err, results){
		if(err){
			console.log(err);
			res.write('error');
			res.end();
		}else{

			var groupID = results[0].insertId;
			var parsedMembers = JSON.parse(memberNames);//json object
			var groupMembers = parsedMembers.groupMembers;;
			// console.log(groupMembers);
			for(var y = 0;y<groupMembers.length;y++){
				var memberName = groupMembers[y];
				// console.log(memberName);
				var query_addMembers = "INSERT INTO SlugTankGroupMembers(GroupID, MemberName) VALUES ("+groupID+",'"+memberName+"');";
				con.query(query_addMembers, function(err,results){
					if(err){
						console.log(err);
						// res.write('error');
						// res.end();
					}
				})
			}

						
			console.log('success');
			res.write('success');
			res.end();

		}
	})

		// res.write('success');
		// res.end();

	
})

module.exports = router;