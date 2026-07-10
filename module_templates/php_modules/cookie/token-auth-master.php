<?php

$TOKENTYPE = "!!!TOKENTYPE!!!";
$COOKIENAME = "!!!COOKIENAME!!!";
$GLOBALUSER = "!!!NORMALUSER!!!";
$PRIVUSER = "!!!PRIVUSER!!!";
$SIGNINGKEY = "!!!SIGNINGKEY!!!";
$GLOBALERROR = null;
$admin = 0;

// Simple class used for basic serialised object.
class UserData {
    public $role;
}

function create_auth_cookie_md5(string $name, string $user) {
    $user_hash = md5($user);
    $token_values = $user . ':' . $user_hash;
    $value = base64_encode($token_values);

    setcookie($name, $value, [
        'expires'  => time() + 86400,
        'path'     => '/',
        'secure'   => false,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function set_auth_cookie_basic_object(string $cookie_name, string $role) {
    $length = strlen($role);
    $token_values = 'O:8:"UserData":1:{s:4:"role";s:' . $length . ':"' . $role . '";}';
    $value = base64_encode($token_values);

    setcookie($cookie_name, $value, [
        'expires'  => time() + 86400,
        'path'     => '/',
        'secure'   => false,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function set_signed_cookie(string $cookie_name, string $role, string $SIGNINGKEY) {
    $role_length = strlen($role);
    $key_length = strlen($SIGNINGKEY);
    $signature = MD5($role . $SIGNINGKEY);
    $signature_length = strlen($signature);
    $user_object = 'O:8:"UserData":3:{s:4:"role";s:' . $role_length . ':"' . $role . 
    '";s:3:"key";s:' . $key_length . ':"' . $SIGNINGKEY . '";s:3:"sig";s:' . $signature_length . ':"' . $signature . '";}';
    $value = base64_encode($user_object);

    setcookie($cookie_name, $value, [
        'expires'  => time() + 86400,
        'path'     => '/',
        'secure'   => false,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}
function delete_cookie(string $name) {
    // delete for common paths
    setcookie($name, '', time() - 3600, '/');
}

// MD5 Cookie approach
if ($TOKENTYPE === "1") {
    if (!isset($_COOKIE[$COOKIENAME])) {
        // Case 1: no cookie → set it
        create_auth_cookie_md5($COOKIENAME, $GLOBALUSER);
    } else {
        // Case 2/3: cookie exists → validate
        $decoded = base64_decode($_COOKIE[$COOKIENAME], true);
        if ($decoded === false || strpos($decoded, ':') === false) {
            // Malformed → delete and set fresh
            delete_cookie($COOKIENAME);
            create_auth_cookie_md5($COOKIENAME, $GLOBALUSER);
        } else {
            [$user, $hash] = explode(':', htmlspecialchars($decoded, ENT_QUOTES, 'UTF-8'), 2);

            $userUpper = strtoupper($user);
            $validUser = ($userUpper === $GLOBALUSER || $userUpper === $PRIVUSER);
            $validHash = hash_equals(md5($user), $hash ?? '');

            if (!$validUser || !$validHash) {
                // Invalid → delete and set fresh
                delete_cookie($COOKIENAME);
                create_auth_cookie_md5($COOKIENAME, $GLOBALUSER);
            } else {
                // Case 3: valid → (optional) refresh rolling expiry
                create_auth_cookie_md5($COOKIENAME, $userUpper);
                if ($userUpper === $PRIVUSER) {
                    $GLOBALUSER = $PRIVUSER;
                }
            }
        }
    }
}

// Serialised object: basic
if ($TOKENTYPE === "2") {
    if (!isset($_COOKIE[$COOKIENAME])) {
    // Case 1: no cookie → set a fresh one
    set_auth_cookie_basic_object($COOKIENAME, $GLOBALUSER);
    } else {
        $decoded = base64_decode($_COOKIE[$COOKIENAME], true);
        // Attempt safe unserialise — disallow unexpected classes
        $data = @unserialize($decoded, ['allowed_classes' => ['UserData']]);
        // Validate structure
        $validStructure = (
            $data instanceof UserData &&
            isset($data->role) &&
            is_string($data->role)
        );
        if (!$validStructure) {
            // Case 2: malformed → delete + reset
            delete_cookie($COOKIENAME);
            set_auth_cookie_basic_object($COOKIENAME, $GLOBALUSER);
        } else {
            // Case 3: Valid object → check role
            $roleUpper = strtoupper($data->role);
            $validRole = ($roleUpper === $GLOBALUSER || $roleUpper === $PRIVUSER);
            if (!$validRole) {
                // Invalid role → reset
                delete_cookie($COOKIENAME);
                set_auth_cookie_basic_object($COOKIENAME, $GLOBALUSER);
            } else {
                // Valid → refresh cookie (rolling expiry)
                set_auth_cookie_basic_object($COOKIENAME, $roleUpper);
                if ($roleUpper === $PRIVUSER) {
                    $GLOBALUSER = $PRIVUSER;
                    $admin = 1;
                }
            }
        }
    }
}

// Serialised object: signed with provided key
if ($TOKENTYPE === "3") {
    if (!isset($_COOKIE[$COOKIENAME])) {
    // Case 1: no cookie → set a fresh one
    set_signed_cookie($COOKIENAME, $GLOBALUSER, $SIGNINGKEY);
    } else {
        $decoded = base64_decode($_COOKIE[$COOKIENAME], true);
        // Attempt safe unserialise — disallow unexpected classes
        $data = @unserialize($decoded, ['allowed_classes' => ['UserData']]);
        // Validate structure
        $validStructure = (
            $data instanceof UserData &&
            isset($data->role) && 
            isset($data->key) &&
            isset($data->sig) &&
            is_string($data->role)
        );
        $validHash = hash_equals(md5($data->role . $SIGNINGKEY), $data->sig ?? '');
        if (!$validStructure || !$validHash) {
            // Case 2: malformed → delete + reset
            delete_cookie($COOKIENAME);
            set_signed_cookie($COOKIENAME, $GLOBALUSER, $SIGNINGKEY);
        } else {
            // Case 3: Valid object → check role
            $currentRole = $data->role;
            $validRole = ($currentRole === $GLOBALUSER || $currentRole === $PRIVUSER);
            if (!$validRole) {
                // Invalid role → reset
                delete_cookie($COOKIENAME);
                set_signed_cookie($COOKIENAME, $GLOBALUSER, $SIGNINGKEY);
            } else {
                // Valid → refresh cookie (rolling expiry)
                set_signed_cookie($COOKIENAME, $currentRole, $SIGNINGKEY);
                if ($currentRole === $PRIVUSER) {
                    $GLOBALUSER = $PRIVUSER;
                }
            }
        }
    }
}

if ($GLOBALUSER === $PRIVUSER) {
    $admin = 1;
}
?> 