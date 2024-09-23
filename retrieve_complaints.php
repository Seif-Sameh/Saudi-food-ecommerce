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
    $get_complaints = $conn->prepare("SELECT user_name, complaint, submitted_at FROM complaints ORDER BY id DESC");
    $get_complaints->execute();
    $get_complaints->store_result();
    if ($get_complaints->num_rows == 0) {
        http_response_code(200);
        echo json_encode(['status' => 'OK', 'found' => false]);
        $get_complaints->close();
        $conn->close();
        exit(0);
    }
    $get_complaints->bind_result($name, $complaint, $submitted_at);
    $complaints = [];
    while ($get_complaints->fetch()) {
        $complaints[] = array("name" => $name, "complaint" => $complaint, "submitted_at" => $submitted_at);
    }
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'found' => true, 'complaints' => $complaints]);
    $get_complaints->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
