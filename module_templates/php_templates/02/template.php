<?php
session_start();
include 'config.php';
include 'json.php';
//INSERT GATE HEADER HERE
?>
<!DOCTYPE html>
<html lang="en" style="scroll-behavior: smooth;">
<head>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title><?php echo $data['name'];?></title>
</head>
<body>

<?php
include 'backbutton.php';
?>
<div class="corrections">
<div class="headline-wrapper"><span class="mark"><?php echo $data['name']; ?></span></div>
<?php
include 'placeholder.php';
if (!empty($_SESSION['user'])) {
	?>
	<div class="signout_form">
	  <p>Signed in as <strong><?= htmlspecialchars($_SESSION['user']['username'], ENT_QUOTES) ?></strong></p>
	  <form class="sign_out_form" method="post" action="/signout.php"><button>Sign out</button></form>
	</div>
	<?php
}
?>
</div>
    <div class="baseContainer">
        <!--main boundary-->
        <div class="base" data-depth="0.00">

            <!--Top right heading inside base div-->
            <div class="topRightHeading" data-depth="1.00">
                <?php echo $data['name'] ."<br>". $data['system']; ?>
            </div>

            <!--list-->
            <ul data-depth="1.00">
                <li><a href="./about.php"><div class="full-link">ABOUT</div></a></li>
                <li><a href="./work.php"><div class="full-link">EMPLOYEE PORTAL</div></a></li>
                <li><a href="./research.php"><div class="full-link">RESEARCH</div></a></li>
                <li><a href="./hub.php"><div class="full-link">DASHBOARD</div></a></li>
            </ul>

            <!--circular progress bar-1-->
            <div class="prog-1" id="rotator">
                <img class="system_image layer a visible" src="./image_1.png" alt="system image">
                <img class="system_image layer b hidden" src="./image_2.png" alt="" aria-hidden="true">
                <img class="system_image layer c hidden" src="./image_3.png" alt="" aria-hidden="true">
                <img class="system_image layer d hidden" src="./image_4.png" alt="" aria-hidden="true">
                <img class="system_image layer e hidden" src="./image_5.png" alt="" aria-hidden="true">
                <img class="system_image layer f hidden" src="./image_6.png" alt="" aria-hidden="true">
                <img class="system_image layer g hidden" src="./image_7.png" alt="" aria-hidden="true">
                <img class="system_image layer h hidden" src="./image_8.png" alt="" aria-hidden="true">
                </div>
            </div>
            <!--circular progress bar-1-->
            <div class="prog-2" style="display: none;">
                <div class="c100 p25 big">
                    <span>25%</span>
                    <div class="slice">
                        <div class="bar"></div>
                        <div class="fill"></div>
                    </div>
                </div>
            </div>
            <!--circular progress bar-1-->
            <div class="prog-3"style="display: none;">
                <div class="c100 p100 big">
                    <span>100%</span>
                    <div class="slice">
                        <div class="bar"></div>
                        <div class="fill"></div>
                    </div>
                </div>
            </div>
        </div>

        <!--top margin line-->
        <!-- <hr id="line" data-depth="1.00"> -->
    </div>
    <script>
(function(){
  const rotator = document.getElementById('rotator');
  const layers = rotator.querySelectorAll('.system_image'); // two <img> layers
  const total = 5;
  const holdMs = 3000;
  const fadeMs = 700;

  let currentNum = 1;
  let frontImg = layers[0];
  let backImg  = layers[1];
  let frontBg = 'before'; // which pseudo-element is "front"

  // preload
  for (let i = 2; i <= total; i++) {
    const img = new Image();
    img.src = `./image_${i}.png`;
  }

  function nextIndex(n){ return n % total + 1; }

  function showNext() {
    const nextNum = nextIndex(currentNum);
    const nextSrc = `./image_${nextNum}.png`;

    // prepare back image layer
    backImg.src = nextSrc;

    // prepare back pseudo-element layer
    if (frontBg === 'before') {
      rotator.style.setProperty('--bg2', `url("${nextSrc}")`);
      rotator.style.setProperty('--bg-before-opacity', 1);
    } else {
      rotator.style.setProperty('--bg1', `url("${nextSrc}")`);
    }

    // Fade images
    backImg.classList.remove('hidden');
    backImg.classList.add('visible');
    frontImg.classList.remove('visible');
    frontImg.classList.add('hidden');

    // Fade pseudo-elements
    if (frontBg === 'before') {
      rotator.style.setProperty('--bg-before-opacity', 0);
      rotator.style.setProperty('--bg-after-opacity', 1);
      frontBg = 'after';
    } else {
      rotator.style.setProperty('--bg-after-opacity', 0);
      rotator.style.setProperty('--bg-before-opacity', 1);
      frontBg = 'before';
    }

    // swap references after fade
    setTimeout(() => {
      const tmp = frontImg;
      frontImg = backImg;
      backImg = tmp;
      currentNum = nextNum;
    }, fadeMs);
  }

  // initialize CSS variable defaults
  rotator.style.setProperty('--bg-before-opacity', 1);
  rotator.style.setProperty('--bg-after-opacity', 0);

  // start loop
  setInterval(showNext, holdMs);
})();
</script>
</body>

</html>