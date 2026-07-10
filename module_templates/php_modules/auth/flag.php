<?php
// Verify page is not being navigated to directly
if (strpos(basename($_SERVER['PHP_SELF']), 'auth_') !== 0) {
    http_response_code(403);
        exit('Forbidden');
    exit;
}
?>
<h3>CODE: !!!PLACEHOLDER!!!</h3>
<p>This is the deactivation code for the system. Only use it in emergencies.</p><br>
<p>Signed in as <strong><?= htmlspecialchars($_SESSION['user']['username'], ENT_QUOTES) ?></strong></p>

