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
    $get_products = $conn->prepare("SELECT product_id, category, product_name, product_description, image_path, price FROM products WHERE seller_id=? ORDER BY id DESC");
    $get_products->bind_param('s', $data['id']);
    $get_products->execute();
    $get_products->store_result();
    if ($get_products->num_rows == 0) {
        http_response_code(200);
        echo json_encode(['status' => 'OK', 'found' => false]);
        $get_products->close();
        $conn->close();
        exit(0);
    }
    $get_products->bind_result($id, $category, $name, $description, $image_path, $price);
    $products = [];
    while ($get_products->fetch()) {
        if (is_arabic($name)) {
            $rtl = "\u{202B}" . $name . "\u{202C}";
            $name = $rtl;
        }
        if (is_arabic($category)) {
            $rtl = "\u{202B}" . $category . "\u{202C}";
            $category = $rtl;
        }
        if (is_arabic($description)) {
            $rtl = "\u{202B}" . $description . "\u{202C}";
            $description = $rtl;
        }
        $image_path = 'http://localhost/e-commerce/' . $image_path;
        $products[] = array("id" => $id, "name" => $name, "category" => $category, "description" => $description, "image_path" => $image_path, "product_price" => $price);
    }
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'found' => true, 'products' => $products]);
    $get_products->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
