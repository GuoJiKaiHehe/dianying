<?php



// header("Access-Control-Allow-Origin: *");
$getUrl = $_GET["urls"];

// $getUrl="http://m.maoyan.com/cinemas.json";
$data = file_get_contents($getUrl);
$data = "a(".$data.")";
echo $data;