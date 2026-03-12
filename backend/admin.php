<?php
// admin.php - Admin/Staff API Entry Point

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$input = json_decode(file_get_contents('php://input'), true);

// JWT Middleware for Admin routes would go here

switch ($path) {
    case '/verify-device':
        if ($method === 'POST') {
            $userId = $input['user_id'];
            $deviceId = $input['device_id'];
            $stmt = $pdo->prepare("UPDATE devices SET is_verified = 1 WHERE user_id = ? AND device_id = ?");
            $stmt->execute([$userId, $deviceId]);
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
