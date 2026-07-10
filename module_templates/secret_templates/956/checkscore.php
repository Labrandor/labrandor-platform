<?php
// declare(strict_types=1);

const FLAG = "!!!PLACEHOLDER!!!";

header('Content-Type: application/json');

try {
    // Read and decode JSON body
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        echo json_encode(['value' => 'Fail', 'error' => 'Empty body']);
        exit;
    }

    $data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);

    if (!isset($data['score']) || !is_numeric($data['score'])) {
        echo json_encode(['value' => 'Fail', 'error' => 'Invalid score']);
        exit;
    }
    $score = (int)$data['score'];
    $passed = $score > 337;
    $result = [
        'value' => $passed ? FLAG : 'Fail'
    ];

    echo json_encode($result);
} catch (Throwable $e) {
    // Ensure we STILL return JSON on errors
    http_response_code(400);
    echo json_encode(['value' => 'Fail', 'error' => $e->getMessage()]);
}
?>