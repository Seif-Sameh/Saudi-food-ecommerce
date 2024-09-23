<?php
session_start();
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $phone_number = trim($data['phone_number']);
    $email = trim($data['email']);
    $name = trim($data['name']);
    $reference_number = trim($data['reference_number']);
    $name = ucwords($name);
    $password = $data['password'];
    include('./connection.php');
    $check_email = $conn->prepare("SELECT id FROM sellers WHERE email=? LIMIT 1");
    $check_email->bind_param('s', $email);
    $check_email->execute();
    $check_email->store_result();
    if ($check_email->num_rows > 0) {
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'Seller exists']);
        $check_email->close();
        $conn->close();
        exit(0);
    }
    $check_email->close();
    $add_user = $conn->prepare("INSERT INTO sellers (sellers_id, email, phone_number, password, status, name, reference_number) VALUES (?, ?, ?, ?, 'active', ?, ?)");
    $password = password_hash($password, PASSWORD_BCRYPT);
    $user_id = uniqid('seller', true);
    $add_user->bind_param('ssisss', $user_id, $email, $phone_number, $password, $name, $reference_number);
    $add_user->execute();
    $add_user->close();
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'message' => 'Successful registeration']);
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
