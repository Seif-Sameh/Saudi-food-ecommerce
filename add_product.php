<?php
session_start();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $allowed = ['jpg', 'jpeg', 'png', 'gif'];
    $file_name = $_FILES['image']['name'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    if (in_array($file_ext, $allowed)) {
        $upload_dir = 'uploads/';

        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        $new_file_name = uniqid('img_') . '.' . $file_ext;
        $upload_path = $upload_dir . $new_file_name;

        if (!move_uploaded_file($file_tmp, $upload_path)) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Internal server error']);
            exit(0);
        }
    } else {
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'Invalid image']);
        exit(0);
    }
    $product_id = uniqid('product_', true);
    $category = trim($_POST['category']);
    $product_name = trim($_POST['product_name']);
    $product_description = $_POST['product_description'];
    $image_path = $upload_path;
    $seller_id = $_POST['id'];
    $seller_name = $_POST['name'];
    include('./connection.php');
    $add_product = $conn->prepare("INSERT INTO products (product_id, category, product_name, product_description, image_path, seller_id,
    seller_name) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $add_product->bind_param('sssssss', $product_id, $category, $product_name, $product_description, $image_path, $seller_id, $seller_name);
    if (!$add_product->execute()) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'database error']);
        $add_product->close();
        $conn->close();
        exit(0);
    }
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'message' => 'added successfully']);
    $add_product->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
