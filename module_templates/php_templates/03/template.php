<?php
session_start();
include 'config.php';
include 'json.php';
//INSERT GATE HEADER HERE
?>
<!DOCTYPE html>
<html lang="en" style="scroll-behavior: smooth;">
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <title><?php echo $data['name'];?></title>
</head>

<body>
<div class="container">
  <h1 style="display:inline-block"><?php echo $data['name']; ?></h><h1 style="float:right; display:inline-block"></h1>
<div class="insider">
<?php
include 'placeholder.php';
if (!empty($_SESSION['user'])) {
	?>
	<div class="signout_form">
      <p>Signed in as <strong><?= htmlspecialchars($_SESSION['user']['username'], ENT_QUOTES) ?></strong></p>
      <form method="post" action="/signout.php"><button>Sign out</button></form>
    </div>
	<?php
}
?>
</div>
  <div class="challenge">
    <p>| <a href="./index.php" target="">Home</a> | 
    <a href="./hub.php" target="">Dashboard</a> | 
    <a href="./work.php" target="">Employee System</a> | 
    <a href="./research.php" target="">Research & Development</a> | 
    <a href="./about.php" target="">About</a> | 
    </p>
  </div>
</div>
</body>
<html>