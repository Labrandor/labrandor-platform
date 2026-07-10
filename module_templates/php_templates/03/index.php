<?php
session_start();
include 'config.php';
include 'json.php';
?>
<html lang="en" style="scroll-behavior: smooth;">
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <title><?php echo $data['name'];?></title>
</head>
<body>
<div class="container">
  <h1 style="display:inline-block"><?php echo $data['name'] ." - ". $data['system']; ?></h><h1 style="float:right; display:inline-block"></h1>
  <div class="gallery-wrap">
    <div class="item item-1">
      <div class="caption">
        <h1><?php echo $data['slogan']; ?></h1>
        <p><?php echo $data['description']; ?></p>
      </div>
    </div>
    <div class="item item-2">
      <div class="caption">
        <h1>What?</h1>
        <p><?php echo $data['what']; ?></p>
      </div>
    </div>
    <div class="item item-3">
      <div class="caption">
        <h1>How?</h1>
        <p><?php echo $data['how']; ?></p>
      </div>
    </div>
    <div class="item item-4">
      <div class="caption">
        <h1>Why?</h1>
        <p><?php echo $data['why']; ?></p>
      </div>
    </div>
    <div class="item item-5">
      <div class="caption">
        <h1>About Us</h1>
        <p><?php echo $data['about']; ?></p>
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