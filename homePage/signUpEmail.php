<?php 

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$email = $_POST["email"];

$dbName = "ClubWebsite";
$mysql_username = "root";
$mysql_password = "Terra51197";
$server_name = "localhost";
$conn = mysqli_connect($server_name, $mysql_username, $mysql_password, $dbName);
if($conn){
	echo 'connection successful';
}else{
	echo 'error';
}

$query_checkForEmail = "SELECT * FROM EmailSignUps WHERE Email = '$email';"

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }

var_dump($result);


 ?>