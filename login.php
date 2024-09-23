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
    $email = trim($data['email']);
    $password = $data['password'];
    $role = $data['role'];
    $table_name = $role === 'admin' ? 'admins' : ($role === 'user' ? 'users' : 'sellers');
    include('connection.php');
    if ($table_name == 'sellers' or $table_name == 'users') {
        $target_id = $table_name . '_id';
        $login = $conn->prepare("SELECT $target_id, name, password FROM $table_name WHERE email=? and status='active' LIMIT 1");
        $login->bind_param('s', $email);
        $login->execute();
        $login->store_result();
        if ($login->num_rows > 0) {
            $login->bind_result($id, $name, $hashed_password);
            $login->fetch();
            $login->close();
            if (password_verify($password, $hashed_password)) {
                session_regenerate_id(true);
                $_SESSION['id'] = $id;
                $_SESSION['name'] = $name;
                $_SESSION['role'] = $role;
                setcookie('PHPSESSID', session_id(), 0, "/", "", true, true);
                http_response_code(200);
                echo json_encode(['status' => 'OK', 'message' => 'Successful login']);
                $conn->close();
                exit(0);
            } else {
                http_response_code(403);
                echo json_encode(['status' => 'error', 'message' => 'Forbidden']);
                $conn->close();
                exit(0);
            }
        } else {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Forbidden']);
            $login->close();
            $conn->close();
            exit(0);
        }
    } else {
        $login = $conn->prepare("SELECT admin_id, password FROM $table_name WHERE email=? LIMIT 1");
        $login->bind_param('s', $email);
        $login->execute();
        $login->store_result();
        if ($login->num_rows > 0) {
            $login->bind_result($id, $hashed_password);
            $login->fetch();
            $login->close();
            if (password_verify($password, $hashed_password)) {
                session_regenerate_id(true);
                $_SESSION['id'] = $id;
                $_SESSION['role'] = $role;
                setcookie('PHPSESSID', session_id(), 0, "/", "", true, true);
                http_response_code(200);
                echo json_encode(['status' => 'OK', 'message' => 'Successful login']);
                $conn->close();
                exit(0);
            } else {
                http_response_code(403);
                echo json_encode(['status' => 'error', 'message' => 'Forbidden']);
                $conn->close();
                exit(0);
            }
        } else {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Forbidden']);
            $login->close();
            $conn->close();
            exit(0);
        }
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid method']);
    exit(0);
}
