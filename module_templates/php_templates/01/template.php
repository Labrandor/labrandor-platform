<?php
// session_set_cookie_params([
//   'lifetime' => 0,
//   'path'     => '/',
//   'domain'   => '',      // leave empty when serving via IP/host directly
//   'httponly' => true,
//   'samesite' => 'Lax',   // good for refresh/top-level nav
// ]);
session_start();
include 'config.php';
include 'json.php';

error_log(sprintf(
  'REQ %s %s host=%s port=%s cookie=%s sid=%s',
  $_SERVER['REQUEST_METHOD'],
  $_SERVER['REQUEST_URI'],
  $_SERVER['HTTP_HOST'] ?? 'n/a',
  $_SERVER['SERVER_PORT'] ?? 'n/a',
  isset($_COOKIE[session_name()]) ? 'present' : 'none',
  session_id()
));
//INSERT GATE HEADER HERE
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title><?php echo $data['name'];?></title>

</head>
<body data-overlayscrollbars-initialize="">
<?php
  include 'header.php';
?>
    <section class="hero">
      <div class="imported-content">
        <?php
          include 'placeholder.php';
		  if (!empty($_SESSION['user'])) { ?>
          <div class="signout_form">
            <p>Signed in as <strong><?= htmlspecialchars($_SESSION['user']['username'] ?? '', ENT_QUOTES) 
			?></strong></p>
            <form class="sign_out_form" method="post" action="/signout.php"><button>Sign out</button></form>
          </div>
		  <?php } ?>
      </div>
    </section>
    <section class="project" style="height:1px; width:auto;"></section>
	
    <?php
      include 'footer.php';
    ?>
	</main>
	  <style>
    :root { --color-prime: #b124e2; cursor: none; }
    body { background-color: var(--color-lightGray); }
  </style>
  <script defer src="./js/awlVendor.js"></script>
  <script defer src="./js/overview.js"></script>
  <link rel="stylesheet" href="./overview.css">
</body>
</html>
