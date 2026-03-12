<?php
require_once __DIR__ . '/db.php';
try {
    $tables = ['accounts', 'attendance', 'classes', 'devices', 'grades', 'schedules', 'transactions', 'users'];
    $schema = [];
    foreach ($tables as $table) {
        $stmt = $pdo->query("DESCRIBE $table");
        $schema[$table] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    echo json_encode($schema, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
