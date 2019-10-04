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


router.get('/loadActiveMembers', (req,res)=>{
    var query_getAllActiveMembers = "SELECT * FROM TeamMembers WHERE Active = 'Y';";
    con.query(query_getAllActiveMembers, function(err, results){
        if(err){
            console.log(err);
            res.write("error");
            res.end();
        }else{
            if(results != null){
                var teamMembers = [];
                for(var i =0;i<results.length;i++){
                    var memberData = results[i];
                    var teamMemberObject = {fullName: memberData.FullName, position: memberData.Position, description: memberData.Description, imagePath: memberData.ImagePath};
                    teamMembers.push(teamMemberObject);
                }

                if(teamMembers.length == 0){
                    res.write('none');
                }else{
                    // console.log(teamMembers);
                    res.json({
                        teamMembers: teamMembers
                    })
                    res.end();
                }
            }
        }
    })
})

module.exports = router;