<?php
/////////////////////////////////////
// Log everything
error_reporting(E_ALL);
ini_set('display_errors', '0');        // keep errors out of HTML
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/php-error.log'); // writable path

// Convert warnings/notices to exceptions so they don't get ignored
set_error_handler(function ($severity, $message, $file, $line) {
    if (error_reporting() & $severity) {
        throw new ErrorException($message, 0, $severity, $file, $line);
    }
});

// Catch fatals that would otherwise kill output silently
register_shutdown_function(function () {
    $e = error_get_last();
    if ($e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        error_log("FATAL: {$e['message']} in {$e['file']}:{$e['line']}");
    }
});

//////////////////////////////
?>