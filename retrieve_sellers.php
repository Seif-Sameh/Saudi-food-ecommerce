<?php
session_start();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include('./connection.php');
    $get_sellers = $conn->prepare("SELECT sellers_id, name, email, phone_number, reference_number, status FROM sellers ORDER BY id");
    $get_sellers->execute();
    $get_sellers->store_result();
    if ($get_sellers->num_rows == 0) {
        http_response_code(200);
        echo json_encode(['status' => 'OK', 'found' => false]);
        $get_sellers->close();
        $conn->close();
        exit(0);
    }
    $get_sellers->bind_result($id, $name, $email, $phone_number, $reference_number, $status);
    $sellers = [];
    while ($get_sellers->fetch()) {
        $sellers[] = array("id" => $id, "name" => $name, "email" => $email, "phone_number" => $phone_number, "reference_number" => $reference_number, "status" => $status);
    }
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'found' => true, 'sellers' => $sellers]);
    $get_sellers->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
