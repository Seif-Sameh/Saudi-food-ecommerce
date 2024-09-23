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
    $complaint = trim($data['complaint']);
    include('./connection.php');
    $add_complaint = $conn->prepare("INSERT INTO complaints (user_id, user_name, complaint) VALUES (?, ?, ?)");
    $add_complaint->bind_param('sss', $data['id'], $data['name'], $complaint);
    $add_complaint->execute();
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'message' => 'complaint added successfully']);
    $add_complaint->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
