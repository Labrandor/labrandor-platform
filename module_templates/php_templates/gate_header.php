<?php
// This does not return the page extension, '.php'
$page_name = pathinfo($_SERVER['PHP_SELF'], PATHINFO_FILENAME); 
// If auth is NOT required, bypass
if ($page_name === "work"){
    if (WORK_AUTH === false) {
        header('Location: $middleware');
        exit;
    }
}
if ($page_name === "research"){
    if (RESEARCH_AUTH === false) {
        header('Location: $middleware');
        exit;
    }
}
if ($page_name === "hub"){
    if (SYSTEM_AUTH === false) {
        header('Location: $middleware');
        exit;
    }
}
// If user session already exists, bypass
if (!empty($_SESSION['user'])) {
    header('Location: $middleware');
        exit;
}

// Read error code to show friendly messages
$err = $_GET['err'] ?? '';
$messages = [
    'badcreds' => 'Incorrect username or password.',
    'required' => 'Please log in to continue.',
];
?>