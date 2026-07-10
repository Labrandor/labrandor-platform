<?php
# This page is not included with any other page, it is stand alone.
declare(strict_types=1);
session_start();
require __DIR__ . '/config.php';
$source = "$start";

/**
 * Middleware rules:
 * 1) If AUTH not required → forward to target page.
 * 2) If already authenticated → forward to target page.
 * 3) If POSTed credentials and valid → establish session → forward.
 * 4) Else, bounce to origin with a helpful reason.
 */

// If auth is NOT required, bypass
if ($source === "/work.php"){
    if (WORK_AUTH === false) {
        header('Location: $destination');
        exit;
    }
}
if ($source === "/research.php"){
    if (RESEARCH_AUTH === false) {
        header('Location: $destination');
        exit;
    }
}
if ($source === "/hub.php"){
    if (SYSTEM_AUTH === false) {
        header('Location: $destination');
        exit;
    }
}

// 2) Already signed in?
if (!empty($_SESSION['user'])) {
    header('Location: $destination');
    exit;
}

// 3) Handle a login attempt
if (($_POST['action'] ?? '') === 'login') {
    $u = trim($_POST['username'] ?? '');
    $p = (string)($_POST['password'] ?? '');
    if ($u !== '' && $p !== '' && ($user = verify_credentials($u, $p, $source))) {
        $_SESSION['user'] = $user; 
        // Regenerate ID on privilege change to prevent fixation
        session_regenerate_id(true);
        header('Location: $destination');
        exit;
    }
    // Invalid credentials
    header('Location: $start?err=badcreds');
    exit;
}

// 4) Reaching here means auth is required but no valid session/POST
header('Location: $start?err=required');
exit;
