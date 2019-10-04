const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors')

app.use(cors());

// app.use(function(req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "http://ec2-52-33-15-158.us-west-2.compute.amazonaws.com");
//   res.header("Access-Control-Allow-Origin", "http://scee.ucsc.edu");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// 	// Set to true if you need the website to include cookies in the requests sent
// 	// to the API (e.g. in case you use sessions)
// 	res.setHeader('Access-Control-Allow-Credentials', true);

// 	// Pass to next layer of middleware
// 	console.log("set headers");
// 	next();
// });
var server = app.listen(3000, function(){
	console.log('listening on 3000');
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Terra51197',
	database: 'ClubWebsite',
	multipleStatements: true,
	charset: 'utf8mb4'
});

con.connect(function(error){
	if(error) throw error;
	console.log("connected to database");
})



app.use(router);
app.use(cors());

router.post('/emailSignUp', (req,res)=>{
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;

	var query_checkForEmail = "SELECT * FROM EmailSignUps WHERE Email = '"+email+"';";
	con.query(query_checkForEmail, function(err, results){
		if(err){
			console.log(err);
			res.write('error');
			res.end();
		}else{
			if(results != null){
				if(results.length > 0){
					//email exists
					console.log('found');
					res.write('found');
					res.end();
				}else{
					var query_insertEmail = "INSERT INTO EmailSignUps(FirstName,LastName,Email) VALUES ('"+firstName+"','"+lastName+"','"+email+"');";
					con.query(query_insertEmail, function(err, results){
						if(err){
							console.log(err);
							res.write('error');
							res.end();
						}else{
							console.log('success');
							res.write('success');
							res.end();
						}
					})
				}
			}
		}
	})
})

router.post('/newMemberSignUp', (req,res)=>{
	var fullName = req.body.fullName;
	var email = req.body.email;
	var position = req.body.position;
	var description = req.body.description;

	console.log(position);

	var query_checkForPerson = "SELECT * FROM TeamMembers WHERE FullName = '"+fullName+"' OR Email = '"+email+"';";
	con.query(query_checkForPerson, function(err, results){
		if(err){
			console.log(err);
			res.write('error');
			res.end();
		}else{
			if(results != null){
				if(results.length > 0){
					//email exists
					console.log('found');
					res.write('found');
					res.end();
				}else{
					var query_insertTeamMember = "INSERT INTO TeamMembers(FullName,Email,Position,Description) VALUES ('"+fullName+"','"+email+"','"+position+"','"+description+"');";
					con.query(query_insertTeamMember, function(err, results){
						if(err){
							console.log(err);
							res.write('error');
							res.end();
						}else{
							console.log('success');
							res.write('success');
							res.end();
						}
					})
				}
			}
		}
	})
})

router.post('/newContactRequest', (req,res)=>{
	var fullName = req.body.fullName;
	var email = req.body.email;
	var description = req.body.description;

	var query_insertContactRequest = "INSERT INTO ContactRequests(FullName,Email,Description) VALUES ('"+fullName+"','"+email+"','"+description+"');";
	con.query(query_insertContactRequest, function(err, results){
		if(err){
			console.log(err);
			res.write('error');
			res.end();
		}else{
			res.write('success');
			res.end();
		}
	})
})

const aboutPageRouter = require('./aboutPageFunctions.js');
const eventsPageRouter = require('./events.js');
const slugTankRouter = require('./slugTankFunctions.js');
app.use(aboutPageRouter);
app.use(eventsPageRouter);
app.use(slugTankRouter);




