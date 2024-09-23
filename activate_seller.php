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
    $data = json_decode(file_get_contents('php://input'), true);
    $seller_id = $data['seller_id'];
    include('./connection.php');
    $activate_seller = $conn->prepare("UPDATE sellers SET status='active' WHERE sellers_id=?");
    $activate_seller->bind_param('s', $seller_id);
    $activate_seller->execute();
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'message' => 'activated successfully']);
    $activate_seller->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
