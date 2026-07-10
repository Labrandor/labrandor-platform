<?php
session_start();
include 'config.php';
include 'json.php';
?>
<!DOCTYPE html>
<html lang="en" class="no-js" data-overlayscrollbars="" data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll" style="scroll-behavior: smooth;">
<head>
<title><?php echo $data['name'];?></title>
<?php echo "
<style>:root {
        --color-prime: #b124e2;
        cursor: none;
      }

      body {
        background-color: var(--color-lightGray);
      }

      .loading-msg {
        position: absolute;
        z-index: 1000;
        inset: 0;
        width: 100svw;
        height: 100svh;
        background-color: #252525;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: \"Courier New\", Courier, monospace;
        font-size: max(2svw, 2rem);
        color: #8a8a8a;
      }

      .no-js-message {
        display: none;
      }</style>
	  <script defer=\"defer\" src=\"./js/awlVendor.js\"></script>
	  <script defer=\"defer\" src=\"./js/overview.js\"></script>
	  <link href=\"./overview.css\" rel=\"stylesheet\">
</head>"
?>
<body data-overlayscrollbars-initialize="">
<?php
include 'header.php'; 	
?>
<section class="hero">
                    <div class="hero-inner max-width">
                        <div class="hero-main" style="min-height: 50px !important;">
                            <div class="left-part">
                                <div class="headline-wrapper"><span class="mark"><?php echo $data['name']; ?></span>
                                    <h1>About Us</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="project">
                    <div class="max-width">
                        <div class="project-info">
                            <div class="top">
                                <div class="mark">Welcome</div>
                                <p class="text1"><?php echo $data['about']; ?></p>
                            </div>
                            <div class="bottom">
                                <div class="column">
                                    <img src="./ceo.png" style="max-width:500px;" alt="CEO">
                                </div>
                                <div class="column">
                                    <div class="mark">Chief Executive Officer</div>
                                    <p class="text3"><b><?php echo $data['ceoname']; echo " - </b>"; echo $data['ceobio']; ?></p>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="column">
                                    <img src="./coo.png" style="max-width:500px;" alt="COO">
                                </div>
                                <div class="column">
                                    <div class="mark">Chief Operations Officer</div>
                                    <p class="text3"><b><?php echo $data['cooname']; echo " - </b>"; echo $data['coobio']; ?></p>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="column">
                                    <img src="./cto.png" style="max-width:500px;" alt="CTO">
                                </div>
                                <div class="column">
                                    <div class="mark">Chief Technology Officer</div>
                                    <p class="text3"><b><?php echo $data['ctoname']; echo " - </b>"; echo $data['ctobio']; ?></p>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="column">
                                    <img src="./ciso.png" style="max-width:500px;" alt="CISO">
                                </div>
                                <div class="column">
                                    <div class="mark">Chief Information Security Officer</div>
                                    <p class="text3"><b><?php echo $data['cisoname']; echo " - </b>"; echo $data['cisobio']; ?></p>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="column">
                                    <img src="./cso.png" style="max-width:500px;" alt="CSO">
                                </div>
                                <div class="column">
                                    <div class="mark">Chief Security Officer</div>
                                    <p class="text3"><b><?php echo $data['csoname']; echo " - </b>"; echo $data['csobio']; ?></p>
                                </div>
                            </div>
                        </div>  
							</div>
    </section>

<?php
include 'footer.php';
?>
		</body>
	</html>