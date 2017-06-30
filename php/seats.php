<?php



// header("Access-Control-Allow-Origin: *");
$getUrl = $_GET["urls"];
$showId = $_GET["showId"];
$showDate = $_GET["showDate"];

$getUrl = $getUrl."?showId=".$showId."&showDate=".$showDate;
// $getUrl="http://m.maoyan.com/show/seats?showId=24163&showDate=2017-06-24";
$data = file_get_contents($getUrl);
$data = "a(".$data.")";
echo $data;