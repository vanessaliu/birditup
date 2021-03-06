<!DOCTYPE html>
<html>
<head>
    <title>bird it up! | Inredningstävling</title>
    <meta charset="utf8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!-- SEARCH OPTIMIZATION -->
    <meta name="description" content="Bird It Up! Bird it up är en inspirationssida med fågeltapeter för dig som gillar inredning. Vi anordnar tävlingar där du kan vinna snygga tapeter, självklart finns det många tapeter med fåglar att välja på." />
    <meta name="keywords" content="Bird It Up, birditup.se, Photowall, tävling, tävla, tapet, fåglar, birds, tapetsera, Medieinstitut, Instagram, inredning, Scandinavian Surface, presentkort, creativity, kreativitet, vinst, vinna" />
    <!-- FACEBOOK OG -->
    <meta property="og:url" content="http://birditup.se<?php echo $_SERVER['REQUEST_URI'] ?>" />
    <meta property="og:image" content="http://birditup.se/img/birditup.png" />
    <meta property="og:title" content="Bird It Up! Tävling" />
    <meta property="og:description" content="Tävla nu för en chans att vinna ett presentkort värde 2000 kronor hos Photowall!" />
    <meta property="og:site_name" content="Bird It Up!" />
    <!-- VIEWPORT -->
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1">
    <!-- ICON -->
    <link rel="icon" type="image/ico" href="http://birditup.se/img/logo.png" />
    <!-- STYLESHEETS -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <!-- FONTS -->
    <link href='http://fonts.googleapis.com/css?family=Playfair+Display:400' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Roboto:300,400' rel='stylesheet' type='text/css'>
    <!-- SCRIPTS -->
    <script type="text/javascript" src="js/vendor/instafeed.min.js"></script>
    <script type="text/javascript" src="//connect.facebook.net/en_US/all.js#xfbml=1&version=v2.0&appId=275873742598083"></script>
</head>

<body>
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

    <!-- Wrapper -->
    <div id="wrapper">

        <!-- Header -->
        <header>
            <div class="header-container">
                <div class="logo">
                    <a href="./"><img src="img/headerlogo.png" alt="Bird It Up! logo"/></a>
                </div>
                <div class="social">
                    <a href="http://instagram.com/birditup" class="header-social header-instagram" data-toggle="tooltip" data-placement="auto" target="_blank" title="Följ oss på Instagram!"></a>
                    <a href="http://www.facebook.com/birditup" class="header-social header-facebook" data-toggle="tooltip" data-placement="auto" target="_blank" title="Följ oss på Facebook!"></a>
                    <a href="http://www.pinterest.com/birditup/" class="header-social header-pinterest" data-toggle="tooltip" data-placement="auto" target="_blank" title="Följ oss på Pinterest!"></a>
                </div>
                <div class="mobile-link"><img src="img/menu.png" alt="Menu"/></div>
                <div class="header-navigation">
                    <nav>
                        <ul>
                            <li><a href="./#">Hem</a></li>
                            <li><a href="./#vinst">Vinst</a></li>
                            <li><a href="./#tavlingen">Tävlingen</a></li>
                            <li><a href="./#rosta">Rösta här</a></li>
                            <li><a href="./#inspiration">Inspiration</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        <nav class="mobile-menu">
            <ul>
                <li><a href="./#">Hem</a></li>
                <li><a href="./#vinst">Vinst</a></li>
                <li><a href="./#tavlingen">Tävlingen</a></li>
                <li><a href="./#rosta">Rösta här</a></li>
                <li><a href="./#inspiration">Inspiration</a></li>
                <li class="mobile-social">
                    <a href="http://instagram.com/birditup" target="_blank" class="header-instagram"></a>
                    <a href="http://www.facebook.com/birditup" target="_blank" class="header-facebook"></a>
                    <a href="http://www.pinterest.com/birditup/" target="_blank" class="header-pinterest"></a>
                </li>
            </ul>
        </nav>
        <!-- End header -->

        <!-- Instagram-->
        <div class="section container-fluid rosta" id="rosta">
            <h2>Tävlingsbidrag</h2>
            <div class="section-line"></div>
            <p>Rösta på din favorit här! 1 Like = 1 röst. Du kan rösta på flera bilder, dock endast en gång på varje bidrag. Gillamarkeringar på Instagram räknas inte med i röstningsresultatet.</p>
            <p class="smallertext">Ser du inte like-knappen under bilder, kontrollera att du har inte blockerat Facebook då röstning sker via Facebook likes!</p>
            <div class="container">
                <div id="feed-full"></div>
                <div id="load-more">
                    <a class="button">Load more</a>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <!-- End Instagram-->

        <!-- Footer -->
        <footer class="section container-fluid footer">
            <a href="/"><img class="logo" src="img/logo.png" alt="Bird It Up!"/></a>
            <p class="footertext">bird it up! är ett projekt av studenter på <a href="http://medieinstitutet.se/" target="_blank">Medieinstitutet</a>, i samarbete med <a href="http://www.photowall.com/" target="_blank">Photowall</a>.</p>
            <a href="http://medieinstitutet.se" target="_blank"><img src="img/medieinstitutet.png" alt="Medieinstitutet"/></a>
            <a href="http://www.photowall.com/" target="_blank"><img src="img/photowall.png" alt="Photowall"/></a>
            <h4>Copyright 2014</h4>
        </footer>
        <!-- End footer -->

    </div>
    <!-- End wrapper -->

<!-- Modal for Instagram-images -->
<div id="loadedOverlay"></div>
<div id="loadedImage">
    <div id="loadedImageClose"><p>&times;</p></div>
    <h3>Rösta på:</h3>
    <div class="content"></div>

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-51907930-1', 'birditup.se');
        ga('send', 'pageview');
    </script>
    <!-- SCRIPTS -->
    <script type="text/javascript" src="js/vendor/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="js/vendor/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/scripts.js"></script>
</body>
</html>
