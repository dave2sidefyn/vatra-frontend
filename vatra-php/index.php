<?php

header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

$_POST = json_decode(file_get_contents('php://input'), true);
$_POST['apiKey'] = 'd33i7sn7gj62t4mdptsfe1pclt';

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL,"http://api.vatra.kioh.ch/rest/open");
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, 'jsonParams=' . json_encode($_POST));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$rs = curl_exec($curl);
echo $rs;

curl_close($curl);
