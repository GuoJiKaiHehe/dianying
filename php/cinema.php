<?php



// header("Access-Control-Allow-Origin: *");
$getUrl = $_GET["urls"];
$getId = $_GET["cinemaid"];
$movieid = $_GET["movieid"];

$getUrl = $getUrl."?cinemaid=".$getId."&movieid=".$movieid;
// $getUrl="http://m.maoyan.com/show/seats?showId=24163&showDate=2017-06-24";
$data = file_get_contents($getUrl);
$data = "a(".$data.")";
echo $data;