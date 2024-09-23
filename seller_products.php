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
    $get_products = $conn->prepare("SELECT product_id, category, product_name, product_description, image_path FROM products WHERE seller_id=? ORDER BY id DESC");
    $get_products->bind_param('s', $_SESSION['id']);
    $get_products->execute();
    $get_products->store_result();
    if ($get_products->num_rows == 0) {
        http_response_code(200);
        echo json_encode(['status' => 'OK', 'found' => false]);
        $get_products->close();
        $conn->close();
        exit(0);
    }
    $get_products->bind_result($id, $category, $name, $description, $imge_path);
    $products = [];
    while ($get_products->fetch()) {
        $products[] = array("id" => $id, "name" => $name, "category" => $category, "description" => $description, "image_path" => $imge_path);
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
