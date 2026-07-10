<?php
session_start();
include 'json.php';
?>
<html lang="en" style="scroll-behavior: smooth;">
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <title><?php echo $data['name'];?></title>
</head>
<body>
<div class="container">
  <h1 style="float:left; display:inline-block"><?php echo $data['name']?> - About</h><h1 class="home_link" style="float:right; display:inline-block"><div class="home_link"><a href="./index.php" target="" class="home_link">HOME</a></div></h1>
  <div class="gallery-wrap">
    <div class="item ceo">
      <div class="caption">
        <h1>Chief Executive Officer</h1>
        <p><b><?php echo $data['ceoname']; echo " - </b>"; echo $data['ceobio']; ?></p>
      </div>
    </div>
    <div class="item coo">
      <div class="caption">
        <h1>Chief Operations Officer</h1>
        <p><b><?php echo $data['cooname']; echo " - </b>"; echo $data['coobio']; ?></p>
      </div>
    </div>
    <div class="item cto">
      <div class="caption">
        <h1>Chief Technology Officer</h1>
        <p><b><?php echo $data['ctoname']; echo " - </b>"; echo $data['ctobio']; ?></p>
      </div>
    </div>
    <div class="item ciso">
      <div class="caption">
        <h1>Chief Information Security Officer</h1>
        <p><b><?php echo $data['cisoname']; echo " - </b>"; echo $data['cisobio']; ?></p>
      </div>
    </div>
    <div class="item cso">
      <div class="caption">
        <h1>Chief Security Officer</h1>
        <p><b><?php echo $data['csoname']; echo " - </b>"; echo $data['csobio']; ?></p>
      </div>
    </div>
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