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
                        <div class="hero-main">
                            <div class="left-part">
                                <div class="num" style="border-color: rgb(0, 0, 0);">
								<span style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 1;"><?php
echo mt_rand(0, 9); ?></span>
								<span style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 1;"><?php
echo mt_rand(0, 9); ?></span></div>
                                <div class="headline-wrapper"><span class="mark">Welcome</span>
                                    <h1><?php echo $data['name'] ." ". $data['system']; ?></h1>
                                </div>
                            </div>
                            <div class="carousel-wrapper">
                                <ul class="carousel-dots">
                                    <li class="cursor-hover" data-counter="0"></li>
                                    <li class="cursor-hover active" data-counter="1"></li>
                                    <li class="cursor-hover" data-counter="2"></li>
                                </ul>
                                <ul class="carousel">
                                    <li class="item item1"><img src="./image_2.png" alt="" style="opacity: 0;"></li>
                                    <li class="item item2"><img src="./image_1.png" alt="" style="opacity: 1;">
                                        <div class="canvas-wrap"><canvas width="770" height="562" style="width: 770px; height: 562px; display: none;"></canvas></div>
                                    </li>
                                    <li class="item item3"><img src="./logo.png" alt="" style="opacity: 0;"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="project">
                    <div class="max-width">
                        <div class="project-info">
                            <div class="top">
                                <div class="mark">description</div>
                                <p class="text1"><?php echo $data['description']; ?></p>
                            </div>
                            <div class="bottom">
                                <div class="column">
                                    <h2 class="text2"><?php echo $data['slogan']; ?></h2>
                                </div>
                                <div class="column">
                                    <div class="mark">What is it?</div>
                                    <p class="text3"><?php echo $data['what']; ?></p>
                                </div>
                                <div class="column">
                                    <div class="mark">How it works</div>
                                    <p class="text4"><?php echo $data['how']; ?></p>
                                </div>
                            </div>
                        </div>
                        <div class="additional-info-wrapper">
						<div class="max-width">
                            <div class="additional-info">
                                <div class="mark">Why?</div>
                                <p class="text5"><?php echo $data['why']; ?></p><br>
                            </div>
                        </div>
						</div>
                        <div style="display: none;" class="video-wrapper"><video autoplay="" loop="" muted="" playsinline="">
                            </video></div>
                        <div class="card-wrapper">
                            <div class="card">
                                <div class="top"><span class="mark">Future</span>
                                    <div class="mark">1</div>
                                </div>
                                <div class="column">
                                    <div class="middle" aria-hidden="true"><svg class="middle-bg" viewBox="0 0 131 120" aria-hidden="true">
                                            <path d="M18.287 2.62763C19.5189 1.27254 21.2652 0.5 23.0966 0.5H124C127.59 0.5 130.5 3.41015 130.5 7V97.9436C130.5 99.7532 129.746 101.481 128.418 102.711L112.173 117.767C110.972 118.881 109.394 119.5 107.755 119.5H7C3.41015 119.5 0.5 116.59 0.5 113V24.7062C0.5 23.0893 1.10269 21.5303 2.19039 20.3339L18.287 2.62763Z" fill="#E4E4E4" stroke="#BEBEBE"></path>
                                        </svg> <img class="middle-symbol" src="./assets/img/o/cardIcon6.svg" aria-hidden="true" loading="lazy" alt=""></div>
                                    <div class="bottom"><span class="description">Building the Backbone for Smarter Futures</span></div>
                                </div>
                            </div>
                            <div class="card" style="translate: none; rotate: none; scale: none; transform: perspective(500px); box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;">
                                <div class="top"><span class="mark">Amplification</span>
                                    <div class="mark">2</div>
                                </div>
                                <div class="column">
                                    <div class="middle" aria-hidden="true"><svg class="middle-bg" viewBox="0 0 131 120" aria-hidden="true">
                                            <path d="M18.287 2.62763C19.5189 1.27254 21.2652 0.5 23.0966 0.5H124C127.59 0.5 130.5 3.41015 130.5 7V97.9436C130.5 99.7532 129.746 101.481 128.418 102.711L112.173 117.767C110.972 118.881 109.394 119.5 107.755 119.5H7C3.41015 119.5 0.5 116.59 0.5 113V24.7062C0.5 23.0893 1.10269 21.5303 2.19039 20.3339L18.287 2.62763Z" fill="#E4E4E4" stroke="#BEBEBE"></path>
                                        </svg> <img class="middle-symbol" src="./assets/img/o/cardIcon4.svg" alt="" loading="lazy" aria-hidden="true"></div>
                                    <div class="bottom"><span class="description">Technology that Amplifies Intelligence</span></div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="top"><span class="mark">Powering AI</span>
                                    <div class="mark">3</div>
                                </div>
                                <div class="column">
                                    <div class="middle" aria-hidden="true"><svg class="middle-bg" viewBox="0 0 131 120" aria-hidden="true">
                                            <path d="M18.287 2.62763C19.5189 1.27254 21.2652 0.5 23.0966 0.5H124C127.59 0.5 130.5 3.41015 130.5 7V97.9436C130.5 99.7532 129.746 101.481 128.418 102.711L112.173 117.767C110.972 118.881 109.394 119.5 107.755 119.5H7C3.41015 119.5 0.5 116.59 0.5 113V24.7062C0.5 23.0893 1.10269 21.5303 2.19039 20.3339L18.287 2.62763Z" fill="#E4E4E4" stroke="#BEBEBE"></path>
                                        </svg> <img class="middle-symbol" src="./assets/img/o/cardIcon5.svg" alt="" aria-hidden="true" loading="lazy"></div>
                                    <div class="bottom"><span class="description">Where Innovation Meets Intelligence</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="btn-wrapper"><a class="btn-big cursor-hover" href="#">
                                <div class="back"></div>
                                <div class="front"><img class="btn-arrow btn-arrow-left" width="20" height="20" src="./assets/img/c/arrow-small-black.svg" aria-hidden="true" alt=""> <span class="text">visit project</span> <img class="btn-arrow btn-arrow-right" width="20" height="20" src="./assets/img/c/arrow-small-black.svg" aria-hidden="true" alt=""></div>
                            </a></div>
                    </div>
                    <div class="scrolling-text" aria-hidden="true">
                        <div class="line line1"><span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(-4.776%, 0px, 0px);">»»»»»»»»»»»»»»»»»»»</span> <span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(-4.776%, 0px, 0px);">»»»»»»»»»»»»»»»»»»»</span> <span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(-4.776%, 0px, 0px);">»»»»»»»»»»»»»»»»»»»</span></div>
                        <div class="line line2"><span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(6.8229%, 0px, 0px);"><?php echo $data['system'] . " " . $data['system']; ?>&nbsp;</span> <span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(6.8229%, 0px, 0px);"><?php echo $data['system'] . " " . $data['system']; ?>&nbsp;</span> <span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(6.8229%, 0px, 0px);"><?php echo $data['system'] . " " . $data['system']; ?>&nbsp;</span></div>
                        <div class="line line3"><span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(-4.776%, 0px, 0px);">Project Project Project&nbsp;</span> <span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(-4.776%, 0px, 0px);">Project Project Project&nbsp;</span> <span class="item" style="translate: none; rotate: none; scale: none; transform: translate3d(-4.776%, 0px, 0px);">Project Project Project&nbsp;</span></div>
                    </div>
                    <div class="max-width">
                        <div class="mosaic-wrapper">
						<img src="./image_3.png" alt="">
						<img src="./image_4.png" alt="">
						<img src="./image_5.png" alt="">
						<img src="./image_6.png" alt="">						
						</div>
                        <div style="display:none;" class="img-wrapper mobile-wrapper">
						</div>
                    </div>
                </section>
            </div>
        </div>
    </main>
    <section class="pagination">
        <div class="pagination-pattern"></div>
        <div class="pagination-inner max-width"><span class="mark">Future Projects</span> <a href="https://">
                <h3 class="project-name cursor-hover">NEW DEVELOPMENTS</h3>
            </a>
            <div class="thumbnail-wrapper"><a href="https://"><img class="thumbnail cursor-hover" src="./image_7.png" alt="thumbnail for next project"></a><a href="https://"><img class="thumbnail cursor-hover" src="./image_8.png" alt="thumbnail for next project"></a></div>
            <div class="btn-wrapper"><a class="btn-big cursor-hover" href="#">
                    <div class="back"></div>
                    <div class="front"><img class="btn-arrow btn-arrow-left" width="20" height="20" src="./assets/img/c/arrow-small-black.svg" aria-hidden="true" alt=""> <span class="text">See all projects</span> <img class="btn-arrow btn-arrow-right" width="20" height="20" src="./assets/img/c/arrow-small-black.svg" aria-hidden="true" alt=""></div>
                </a></div>
        </div>
    </section>

<?php
include 'footer.php';
	?>
		</body>
	</html>