<?php
// admin.php - Admin/Staff API Entry Point

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$input = json_decode(file_get_contents('php://input'), true);

// JWT Middleware for Admin routes would go here

switch ($path) {
    case '/unverified-devices':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT d.*, u.username FROM devices d JOIN users u ON d.user_id = u.id WHERE d.is_verified = 0");
            echo json_encode($stmt->fetchAll());
        }
        break;

    case '/verify-device':
        if ($method === 'POST') {
            $deviceId = $input['verificationDeviceId'] ?? $input['device_id'];
            $stmt = $pdo->prepare("UPDATE devices SET is_verified = 1 WHERE device_id = ?");
            $stmt->execute([$deviceId]);
            echo json_encode(['success' => 'Device verified']);
        }
        break;

    case '/dashboard':
        // Statistics endpoint
        echo json_encode(['stats' => 'Dashboard data']);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
}
?>
