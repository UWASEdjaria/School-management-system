<?php
// index.php - Client (Parent/Student) API Entry Point

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$input = json_decode(file_get_contents('php://input'), true);

switch ($path) {
    case '/register':
        if ($method === 'POST') {
            echo json_encode(register($input, $pdo));
        }
        break;

    case '/login':
        if ($method === 'POST') {
            $jwtSecret = $_ENV['JWT_SECRET'];
            echo json_encode(login($input, $pdo, $jwtSecret));
        }
        break;

    case '/fees':
        // Protected route example
        echo json_encode(['message' => 'Fee records endpoint']);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
}
?>
