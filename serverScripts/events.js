const express = require('express');
const mysql = require('mysql');
const router = express.Router();

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Terra51197',
    database: 'ClubWebsite',
    multipleStatements: true,
    charset: 'utf8mb4'
});

router.post('/signUpForEvent', (req,res)=>{
	var eventNumber = req.body.eventNumber;
	var fullName = req.body.fullName;
	var email = req.body.email;
	var phone = req.body.phone;

	var query_checkForSignUp = "SELECT * FROM EventSignUps WHERE fullName = '"+fullName+"' AND Email = '"+email+"';";
	con.query(query_checkForSignUp, function(err, results){
		if(err){
			console.log(err);
			res.write('error');
			res.end();
		}else{
			if(results != null){
				if(results.length > 0){
					res.write('found');
					res.end();
				}else{
					var query_signUpForEvent;
					if(phone.length > 9){
						query_signUpForEvent = "INSERT INTO EventSignUps(FullName,Email,Phone,EventID) VALUES ('"+fullName+"','"+email+"','"+phone+"',"+eventNumber+");";
					}else{
						query_signUpForEvent = "INSERT INTO EventSignUps(FullName,Email,EventID) VALUES ('"+fullName+"','"+email+"',"+eventNumber+");";
					}

					
					con.query(query_signUpForEvent, function(err, results){
						if(err){
							console.log(err);
							res.write("error");
							res.end();
						}else{
							res.write('success');
							res.end();
						}
					})
				}
			}else{
				res.write('error');
				res.end();
			}
		}
	})

	
})

module.exports = router;