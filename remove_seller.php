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
    $remove_seller = $conn->prepare("DELETE FROM sellers WHERE sellers_id=?");
    $remove_seller->bind_param('s', $user_id);
    $remove_seller->execute();
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'message' => 'removed successfully']);
    $remove_seller->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
