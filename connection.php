<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "store";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

if (!$conn) {
    die("Failed to connect: " . mysqli_connect_error());
}
