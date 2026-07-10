<?php
$jsonStrings = file_get_contents('fCKcXn37KpDEit4PfRxf9r5DyLb68t.json');
$data = json_decode($jsonStrings, true);

if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die("Error decoding JSON: " . json_last_error_msg());
}
?>