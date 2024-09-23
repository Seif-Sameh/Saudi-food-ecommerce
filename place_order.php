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
    $data_all = json_decode(file_get_contents('php://input'), true);
    $user_id = $data_all['id'];
    $username = $data_all['name'];
    $datadic = $data_all['order'];
    include('./connection.php');
    foreach ($datadic as $data) {
        $quantity = $data['quantity'];
        $product_id = $data['product_id'];
        $seller_id = $data['seller_id'];
        $product_name = $data['product_name'];
        $price = $data['product_price'];
        $total_price = $price * $quantity;
        $add_order = $conn->prepare("INSERT INTO orders (user_id, seller_id, product_id, product_name, username, quantity, mobile_phone, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $add_order->bind_param('sssssisd', $user_id, $seller_id, $product_id, $product_name, $username, $quantity, $data['phone_number'], $total_price);
        $add_order->execute();
    }
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
