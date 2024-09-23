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
    $get_users = $conn->prepare("SELECT users_id, name, email, phone_number, status FROM users ORDER BY id");
    $get_users->execute();
    $get_users->store_result();
    if ($get_users->num_rows == 0) {
        http_response_code(200);
        echo json_encode(['status' => 'OK', 'found' => false]);
        $get_users->close();
        $conn->close();
        exit(0);
    }
    $get_users->bind_result($id, $name, $email, $phone_number, $status);
    $users = [];
    while ($get_users->fetch()) {
        if (is_arabic($name)) {
            $rtl = "\u{202B}" . $name . "\u{202C}";
            $name = $rtl;
        }
        $users[] = array("id" => $id, "name" => $name, "email" => $email, "phone_number" => $phone_number, "status" => $status);
    }
    http_response_code(200);
    echo json_encode(['status' => 'OK', 'found' => true, 'users' => $users]);
    $get_users->close();
    $conn->close();
    exit(0);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
