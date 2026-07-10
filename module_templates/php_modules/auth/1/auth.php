  <h1>Welcome</h1>
  <?php if ($err && isset($messages[$err])): ?>
    <p style="color:#b00;"><?= htmlspecialchars($messages[$err], ENT_QUOTES) ?></p>
  <?php endif; ?>
  <form class="auth_form" method="post" action="/$middle" autocomplete="off" novalidate>
    <label>Username
      <input type="text" name="username" required>
    </label><br><br>
    <label>Password
      <input type="password" name="password" required>
    </label><br><br>
    <button type="submit" name="action" value="login">Sign in</button>
  </form>
