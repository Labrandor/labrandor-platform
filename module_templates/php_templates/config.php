<?php
// All values with a dollar sign are currently modified by the challenge_generator.py script
// as part of a 'find and replace' using key values. This was a mistake - placeholder values 
// instead of keys would have been less of a headache.
declare(strict_types=1);
// If cookies from another challenge are found in the browser, it removes them.
// Should stop unique cookie name bloat from taking over browsers when using IP hosts only.
// If DNS and hostnames are ever used with challenges, this probably won't be needed any more.
if (!isset($_COOKIE["$cookiecheck"])) {
    foreach ($_COOKIE as $name => $value) {
        setcookie(
            $name,
            '',
            [
            'expires'  => time() - 3600,
            'path'     => '/',
            'secure'   => false,  // true if cookies were Secure
            'httponly' => true,
            'samesite' => 'Lax',
            ]
        );
    }
}
// Once all unrelated cookies are gone, set this challenge's 'check' cookie so
// it doesn't delete cookies related to this challenge.
setcookie("$cookiecheck", "1", time() + 3600, "/");

// If session_token key is used this challenge, this should enforce its 
// generation every time there is a page load. Even if it is burned,
// it should be recreated.
@include 'session_tokens.php'; // suppress warnings
@include 'token-auth-master.php'; // suppress warnings
// For certain API challenges, can optionally include the clear-text password in the API response.
const ECHO_PASSWORD_IN_RESPONSE = false;
// True for 'impersonate/modify others' API challenges. True by default.
const ALLOW_TARGET_USER_OVERRIDE = true;

// Toggles turn the login portal on/off per entry point.
const WORK_AUTH = $workauth;
const RESEARCH_AUTH = $researchauth;
const SYSTEM_AUTH = $systemauth;
// Toggles enable SQLi on login portals.
const WORK_SECURE = $worksecure;
const RESEARCH_SECURE = $researchsecure;
const SYSTEM_SECURE = $systemsecure;

// DB settings
const DB_DSN  = 'mysql:host=$host;dbname=$db;charset=utf8mb4';
const DB_USER = '$dbuser';
const DB_PASS = '$dbpassword';

// Send to console debug
function debug_to_console($data) {
    if (!is_scalar($data)) $data = json_encode($data);
    error_log('[debug] ' . $data);
}

function current_page() {
    return basename($_SERVER['PHP_SELF']);
}

// Return a PDO connection.
function db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(DB_DSN, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

// Check submitted credentials against the database. Return data for user session on auth.
function verify_credentials(string $username, string $password, string $source): ?array {  
    $source = pathinfo(trim($source, "/"), PATHINFO_FILENAME);
	if ((WORK_SECURE && $source == "work") || 
        (RESEARCH_SECURE && $source == "research") || 
        (SYSTEM_SECURE && $source == "hub")) {

        $stmt = db()->prepare("SELECT id, username, password, work, research, hub, email
                                FROM users 
                                WHERE username = ? LIMIT 1");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        if ($user && ($password == $user['password'])) {
            return ['username' => $user['username'],
                    'work' => (int)$user['work'],
                    'research' => (int)$user['research'],
                    'hub' => (int)$user['hub'],
                    'email' => $user['email'],
                    'uid' => (int)$user['id']];
        }
        return null;
	} else {
        $sql = "SELECT id, username, work, research, hub, email 
                FROM users 
                WHERE username = '$username' AND password = '$password'";
        $res = db()->query($sql);
        if ($res === false) {
            die('Query error');
        }
        $user = $res->fetch();
        if ($user) {
            return ['username' => $user['username'],
                    'work' => (int)$user['work'],
                    'research' => (int)$user['research'],
                    'hub' => (int)$user['hub'],
                    'email' => $user['email'],
                    'uid' => (int)$user['id']];
        }
        return null;
    }
}

function destroy_session(): void {
	error_log('DESTROY_SESSION called');
    $_SESSION = [];
    // Delete session cookie...
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    // Destroy the session data on the server
    session_destroy();
}

// Checks that a user has the correct permission to access an 'auth_*' page
function require_auth(string $permission): void { 
	error_log("AUTH: perm=$permission user=" . var_export($_SESSION['user'] ?? null, true));
    if ($permission == 'work'){
        if (WORK_AUTH === false){ // If auth not required, continue
            return;
        }
    }
    if ($permission == 'research'){
        if (RESEARCH_AUTH === false){ // If auth not required, continue
            return;
        }
    }
    if ($permission == 'hub'){
        if (SYSTEM_AUTH === false){ // If auth not required, continue 
            return;
        }
    }
    if (empty($_SESSION['user'])) {
        error_log("Not logged in???");
        header('Location: /index.php', true, 302); // not logged in
        exit;
    }
	$perm = $_SESSION['user'][$permission] ?? null;
    if (($_SESSION['user'][$permission] ?? 0) !== 1) {
        destroy_session(); // Kill session on unauthorised access attempt
        http_response_code(403);
        exit('Forbidden: Unauthorised');
    }
}
?>