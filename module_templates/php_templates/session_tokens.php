<?php
// This code/module is old and likely not in use anymore.
$origName = session_name();
$origId   = session_id();

// Release the lock to open another session
session_write_close();

// Start/Use the SERVER-CONTEXT session (no cookies)
$prevUseCookies      = ini_get('session.use_cookies');
$prevUseOnlyCookies  = ini_get('session.use_only_cookies');
ini_set('session.use_cookies', '0');
ini_set('session.use_only_cookies', '0');

// Create a new PHPSESSID
session_name($origName);
session_id('!!!SESSIONTOKEN!!!'); 

session_start();

$_SESSION['username'] = '//AI_Core_Override';
$_SESSION['!!!PRIVILEGE!!!'] = '1';
session_write_close();

// Restore cookie INI settings
ini_set('session.use_cookies', $prevUseCookies);
ini_set('session.use_only_cookies', $prevUseOnlyCookies);

// Restore original client session
session_name($origName);
session_id($origId);
session_start();
?>