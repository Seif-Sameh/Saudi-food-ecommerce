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
    $quantity = $data['quantity'];
    $product_id = $data['product_id'];
    $seller_id = $data['seller_id'];
    $user_id = $_SESSION['id'];
    $username = $_SESSION['name'];
    $product_name = $_SESSION['product_name'];
    include('./connection.php');
    $add_order = $conn->prepare("INSERT INTO orders (user_id, seller_id, product_id, product_name, username, quantity, mobile_phone) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $add_order->bind_param('sssssis', $user_id, $seller_id, $product_id, $product_name, $username, $quantity, $_SESSION['phone_number']);
    $add_order->execute();
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'message' => 'order added successfully']);
    $add_order->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
