<?php

header('Access-Control-Allow-Origin: http://localhost:9000');
header('Access-Control-Allow-Credentials: true');

$_POST = json_decode(file_get_contents('php://input'), true);
$_POST['VaTra.ApiKey'] = '50d4d6ea-b126-48b6-81ab-7880b45a774c';
$_POST['VaTra.Identification'] = $_POST['creditCardNumber'];
$_POST['VaTra.Honeypot'] = '';
//Zürich
$_POST['latitude'] = '47.3858401';
$_POST['longitude'] = '8.496481';

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, "http://localhost:8080/rest/open");
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, 'jsonParams=' . json_encode($_POST));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$rs = curl_exec($curl);
echo $rs;

curl_close($curl);
