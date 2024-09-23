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
function is_arabic($text)
{
    return preg_match('/\p{Arabic}/u', $text);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include('./connection.php');
    $data = json_decode(file_get_contents('php://input'), true);
    $get_orders = $conn->prepare("SELECT username, product_name, quantity, ordered_at, total_price FROM orders WHERE seller_id = ? ORDER BY id DESC");
    $get_orders->bind_param('s', $data['id']);
    $get_orders->execute();
    $get_orders->store_result();
    if ($get_orders->num_rows == 0) {
        http_response_code(200);
        echo json_encode(['status' => 'OK', 'found' => false]);
        $get_orders->close();
        $conn->close();
        exit(0);
    }
    $get_orders->bind_result($username, $product_name, $quantity, $ordered_at, $total_price);
    $orders = [];
    while ($get_orders->fetch()) {
        if (is_arabic($username)) {
            $rtl = "\u{202B}" . $username . "\u{202C}";
            $username = $rtl;
        }
        if (is_arabic($product_name)) {
            $rtl = "\u{202B}" . $product_name . "\u{202C}";
            $product_name = $rtl;
        }
        $orders[] = array("customer_name" => $username, "product_name" => $product_name, "quantity" => $quantity, "ordered_at" => $ordered_at, "total_price" => $total_price);
    }
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'found' => true, 'orders' => $orders]);
    $get_orders->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
