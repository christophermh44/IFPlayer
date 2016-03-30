<?php
  $settingsFile = $_GET['_settings'];
  $settings = json_decode(file_get_contents($settingsFile));
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>IF Player - Integrated player</title>
  <style>
  html, body {
    background: <?= !empty($_GET['_color']) ? $_GET['_color'] : '#222222' ?>;
    margin: 0;
    height: 48px;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 0;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .logo {
    left: 8px;
    position: absolute;
    top: -8px;
  }

  .controls__play {
    left: 83px;
    position: absolute;
  }

  .controls__fold {
    background-color: rgba(0,0,0,0.54);
    bottom: 0;
    position: absolute;
    right: 31px;
    top: 0;
    width: 30px;
  }

  .controls__close {
    background-color: rgba(0,0,0,0.54);
    bottom: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
  }

  .controls__fold button,
  .controls__close button {
    height: 100%;
    vertical-align: middle;
    width: 100%;
  }

  .controls__fold button svg,
  .controls__close button svg {
    left: 9px;
    position: absolute;
    top: 18px;
  }

  .details-wrapper {
    background-color: rgba(0,0,0,0.54);
    bottom: 8px;
    color: #fff;
    font-family: Arial, sans-serif;
    left: 142px;
    overflow: hidden;
    padding: 6px;
    position: absolute;
    right: 172px;
    top: 8px;
  }

  @keyframes details-infos {
    0% {
      margin-top: 0;
    }
    49% {
      margin-top: 0;
    }
    51% {
      margin-top: -1.75em;
    }
    100% {
      margin-top: -1.75em;
    }
  }

  .js-play-muted .details {
    animation: details-infos 10s infinite alternate linear;
  }

  .js-play-muted .details:hover {
    animation: none;
    margin-top: 0;
  }

  .details__tags {
    margin-bottom: 0.5em;
  }

  .details__tags__prefix,
  .details__tags__title,
  .details__tags__artist {
    display: inline-block;
  }

  .details__tags__artist {
    text-transform: uppercase;
  }

  .details__tags__title::before {
    content: '—\00a0';
  }

  body.shrink-player .controls__play,
  body.shrink-player .share,
  body.shrink-player .tags {
    display: block;
    -webkit-transition: 0.1s display 0.25s;
    -o-transition: 0.1s display 0.25s;
    transition: 0.1s display 0.25s;
  }

  body.shrink-player .controls__play,
  body.shrink-player .share,
  body.shrink-player .tags {
    display: none;
    -webkit-transition: 0.1s display 0.25s;
    -o-transition: 0.1s display 0.25s;
    transition: 0.1s display 0.25s;
  }

  .share {
    position: absolute;
    right: 68px;
    top: 8px;
  }

  .share a {
    text-decoration: none;
  }

  .share svg {
    max-height: 32px;
  }

  svg path {
    fill: white;
  }

  .js-play-playing .controls__play--playing {
    display: inline-block;
  }

  .js-play-playing .controls__play--muted {
    display: none;
  }

  .js-play-muted .controls__play--playing {
    display: none;
  }

  .js-play-muted .controls__play--muted {
    display: inline-block;
  }

  .shrink-player .controls__fold svg {
    transform: rotate(180deg);
  }

  svg {
    max-height: 48px;
    max-width: 48px;
  }

  .mobile-fallback .controls .controls__play,
  .mobile-fallback .controls .controls__fold,
  .mobile-fallback .details-wrapper,
  .mobile-fallback .share {
    display: none;
  }

  .mobile-fallback .logo {
    left: 0;
  }

  .mobile-fallback #audio {
    background-color: rgba(0,0,0,0.54);
    color: #fff;
    left: 70px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 10px;
  }

  .mobile-fallback .controls .controls__close {
    background-color: rgba(0,0,0,1);
    bottom: 0;
    top: 0;
  }
  </style>
</head>
<body class="js-play-muted">
  <audio id="audio" src="<?= $settings->urls->stream ?>" crossOrigin="anonymous"></audio>

  <a href="<?= $settings->radio->url ?>" target="_blank" title="(S'ouvre dans une nouvelle fenêtre)" class="logo">
    <img src="<?= $settings->radio->logo ?>" alt="">
  </a>

  <div class="controls">
    <div class="controls__play">
      <button type="button" class="controls__play--playing" title="Mettre <?= $settings->radio->name ?> en sourdine">
        <svg height="1000" width="928.571" viewBox="0 0 928.571 1000" xmlns="http://www.w3.org/2000/svg"><path d="M428.544 196.48v607.104q0 14.508 -10.602 25.11t-25.11 10.602 -25.11 -10.602l-185.814 -185.814h-146.196q-14.508 0 -25.11 -10.602t-10.602 -25.11v-214.272q0 -14.508 10.602 -25.11t25.11 -10.602h146.196l185.814 -185.814q10.602 -10.602 25.11 -10.602t25.11 10.602 10.602 25.11zm214.272 303.552q0 42.408 -23.715 78.957t-62.775 52.173q-5.58 2.79 -13.95 2.79 -14.508 0 -25.11 -10.323t-10.602 -25.389q0 -11.718 6.696 -19.809t16.182 -13.95 18.972 -12.834 16.182 -19.809 6.696 -31.806 -6.696 -31.806 -16.182 -19.809 -18.972 -12.834 -16.182 -13.95 -6.696 -19.809q0 -15.066 10.602 -25.389t25.11 -10.323q8.37 0 13.95 2.79 39.06 15.066 62.775 51.894t23.715 79.236zm142.848 0q0 85.374 -47.43 157.635t-125.55 105.183q-7.254 2.79 -13.95 2.79 -15.066 0 -25.668 -10.602t-10.602 -25.11q0 -21.762 21.762 -32.922 31.248 -16.182 42.408 -24.552 41.292 -30.132 64.449 -75.609t23.157 -96.813 -23.157 -96.813 -64.449 -75.609q-11.16 -8.37 -42.408 -24.552 -21.762 -11.16 -21.762 -32.922 0 -14.508 10.602 -25.11t25.11 -10.602q7.254 0 14.508 2.79 78.12 32.922 125.55 105.183t47.43 157.635zm142.848 0q0 128.34 -70.866 235.755t-188.604 158.193q-7.254 2.79 -14.508 2.79 -14.508 0 -25.11 -10.602t-10.602 -25.11q0 -20.088 21.762 -32.922 3.906 -2.232 12.555 -5.859t12.555 -5.859q25.668 -13.95 45.756 -28.458 68.634 -50.778 107.136 -126.666t38.502 -161.262 -38.502 -161.262 -107.136 -126.666q-20.088 -14.508 -45.756 -28.458 -3.906 -2.232 -12.555 -5.859t-12.555 -5.859q-21.762 -12.834 -21.762 -32.922 0 -14.508 10.602 -25.11t25.11 -10.602q7.254 0 14.508 2.79 117.738 50.778 188.604 158.193t70.866 235.755z"/></svg>
      </button>
      <button type="button" class="controls__play--muted" title="Écouter <?= $settings->radio->name ?>">
        <svg height="1000" width="428.571" viewBox="0 0 428.571 1000" xmlns="http://www.w3.org/2000/svg"><path d="M428.544 196.48v607.104q0 14.508 -10.602 25.11t-25.11 10.602 -25.11 -10.602l-185.814 -185.814h-146.196q-14.508 0 -25.11 -10.602t-10.602 -25.11v-214.272q0 -14.508 10.602 -25.11t25.11 -10.602h146.196l185.814 -185.814q10.602 -10.602 25.11 -10.602t25.11 10.602 10.602 25.11z"/></svg>
      </button>
    </div>

    <div class="controls__fold js-fold-displayed">
      <button type="button" class="controls__fold__button" title="Replier le player">
        <svg xmlns="http://www.w3.org/2000/svg" height="12" version="1.1" viewBox="0 0 22.161288 22.021522" width="12"><g transform="matrix(0.85222611,0,0,0.85222611,0.02982791,-0.49429136)"><polygon points="15.133,13.5 25.969,24.336 23.885,26.42 10.965,13.5 23.885,0.58 25.969,2.664" style="fill:#ffffff" /><polygon points="4.133,13.5 14.969,24.336 12.885,26.42 -0.035,13.5 12.885,0.58 14.969,2.664" style="fill:#ffffff" /></g></svg>
      </button>
    </div>

    <div class="controls__close">
      <button type="button" class="controls__close__button" title="Fermer le player">
        <svg xmlns="http://www.w3.org/2000/svg" height="12" version="1.1" viewBox="0 0 22.017127 22.021522" width="12"><g style="fill:#ffffff" transform="translate(-0.14416171,-3.8873376e-7)"><g transform="matrix(0.85222611,0,0,0.85222611,0.02982791,-0.49429136)"><polygon style="fill:#ffffff" points="10.965,13.5 23.885,0.58 25.969,2.664 15.133,13.5 25.969,24.336 23.885,26.42 " /><polygon transform="matrix(-1,0,0,1,15.103159,0)" style="fill:#ffffff" points="14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 -0.035,13.5 12.885,0.58 " /></g></g></svg>
      </button>
    </div>
  </div>

  <div class="details-wrapper">
    <div class="details">
      <div class="details__tags">
        <div class="details__tags__prefix">Vous écoutez&nbsp;: </div>
        <div class="details__tags__artist"><?= $settings->radio->name ?></div>
        <div class="details__tags__title"><?= $settings->radio->slogan ?></div>
      </div>
      <div class="details__banner">← Cliquez sur le haut-paleur pour écouter la radio</div>
    </div>
  </div>

  <div class="share">
    <a href="" class="share--facebook" title="Partager sur Facebook">
      <svg height="1000" width="428.571" viewBox="0 0 428.571 1000" xmlns="http://www.w3.org/2000/svg"><path d="M285.138 310.312h143.406l-16.74 158.472h-126.666v459.792h-190.278v-459.792h-94.86v-158.472h94.86v-95.418q0 -101.556 47.988 -153.729t157.914 -52.173h126.666v158.472h-79.236q-21.762 0 -34.875 3.627t-18.972 13.113 -7.533 19.251 -1.674 27.621v79.236z"/></svg>
    </a>
    <a href="" class="share--twitter" title="Partager sur Twitter">
      <svg height="1000" width="928.571" viewBox="0 0 928.571 1000" xmlns="http://www.w3.org/2000/svg"><path d="M903.96 227.728q-37.386 54.684 -90.396 93.186 .558 7.812 .558 23.436 0 72.54 -21.204 144.801t-64.449 138.663 -102.951 117.459 -143.964 81.468 -180.234 30.411q-151.218 0 -276.768 -80.91 19.53 2.232 43.524 2.232 125.55 0 223.758 -77.004 -58.59 -1.116 -104.904 -35.991t-63.612 -89.001q18.414 2.79 34.038 2.79 23.994 0 47.43 -6.138 -62.496 -12.834 -103.509 -62.217t-41.013 -114.669v-2.232q37.944 21.204 81.468 22.878 -36.828 -24.552 -58.59 -64.17t-21.762 -85.932q0 -49.104 24.552 -90.954 67.518 83.142 164.331 133.083t207.297 55.521q-4.464 -21.204 -4.464 -41.292 0 -74.772 52.731 -127.503t127.503 -52.731q78.12 0 131.688 56.916 60.822 -11.718 114.39 -43.524 -20.646 64.17 -79.236 99.324 51.894 -5.58 103.788 -27.9z"/></svg>
    </a>
  </div>

  <script src="//code.jquery.com/jquery-latest.min.js"></script>
  <?php if (property_exists($settings->urls, 'sp')): ?>
  <script src="jssp.js"></script>
  <?php endif; ?>
  <script>
    (function(){
      var isMobileDevice = function() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      }

      if (isMobileDevice()) {
        $('#audio').attr('controls', 'controls');
        $('body').addClass('mobile-fallback');
      }

      // FACULTATIF
      <?php if (property_exists($settings->urls, 'sp')): ?>
      var audio = $('#audio').jssp({
        settings: '<?= $settings->urls->sp ?>' // voir http://jssp.c-mh.fr/
      })[0];
      <?php endif; ?>

      if (!isMobileDevice()) {
        audio.volume = 0;
      }
      audio.play();

      var $playingButton = $('.controls__play--playing');
      var $mutedButton = $('.controls__play--muted');
      var $controlPlay = $('.controls__play');
      var $controlFold = $('.controls__fold');
      var $controlClose = $('.controls__close');

      $playingButton.on('click', function(e) {
        audio.volume = 0;
        $('body').removeClass('js-play-playing').addClass('js-play-muted');
      });

      $mutedButton.on('click', function(e) {
        audio.volume = 1;
        $('body').removeClass('js-play-muted').addClass('js-play-playing');
      });

      $controlFold.on('click', function(e) {
        var status = !($('body').hasClass('shrink-player'));
        window.parent.postMessage({eventName: 'toggle-fold', data: {status: status}}, '*');
      });

      $controlClose.on('click', function(e) {
        window.parent.postMessage({eventName: 'close-player', data: {}}, '*');
      });

      var updateTags = function() {
        $.getJSON('<?= $settings->urls->tags ?>', function(data) {
          $('.details__tags__artist').text(data.artist);
          $('.details__tags__title').text(data.title);
          $('.share--facebook').attr('href', 'https://facebook.com/sharer/sharer.php?s=100&u=<?= $settings->urls->sharer ?>?v=' + (new Date));
          $('.share--twitter').attr('href', 'https://twitter.com/intent/tweet?text=En%20ce%20moment,%20j%27%C3%A9coute%20' + encodeURIComponent(data.title) + '%20de%20' + encodeURIComponent(data.artist) + '.<?= property_exists($settings->radio->twitter) ? '&via='.$settings->radio->twitter : '' ?>');
        });
      };

      $('[class^="share--"]').on('click', function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        window.open(href, '', 'width=600,height=400,titlebar=yes');
        return false;
      });

      window.setInterval(updateTags, 15000);
      updateTags();
    })();
  </script>
</body>
</html>
