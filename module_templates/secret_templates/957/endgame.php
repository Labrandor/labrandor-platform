<?php
// declare(strict_types=1);

const FLAG = "!!!PLACEHOLDER!!!";
const WINVALUE = 49999999998;
const DAYS = 363;

header('Content-Type: application/json');

try {
    // Read and decode JSON body
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        echo json_encode(['value' => 'Invalid', 'error' => 'Empty body']);
        exit;
    }

    $data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);

    if (!isset($data['score']) || !is_numeric($data['score'])) {
        echo json_encode(['value' => 'Invalid', 'error' => 'Invalid score']);
        exit;
    }
    $score = (int)$data['score'];
    $day = (int)$data['day'];

    if ($score > WINVALUE){
        if ($day > DAYS){
            $result = [
            'value' => FLAG,
            'text' => "The deactivation code is:"
            ];
        } else {
            $result = [
            'value' => 'Invalid',
            'text' => "Cheating detected"
            ];
        }
    } else {
    $result = [
    'value' => 'Invalid',
    'text' => "Low score"
    ];
    }

    echo json_encode($result);
} catch (Throwable $e) {
    // Ensure we STILL return JSON on errors
    http_response_code(400);
    echo json_encode(['value' => 'Invalid', 'error' => $e->getMessage()]);
}
?>