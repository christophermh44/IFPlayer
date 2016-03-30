;(function IFPlayer(settings) {
  'use strict';
  
  var __translations = {
    "This website": "Ce site",
    "is a partner of": "est partenaire de",
    "How long do you want to hide this player?": "Pour combien de temps souhaitez-vous masquer le player ?",
    "day": "jour",
    "week": "semaine",
    "month": "mois",
    "Always": "Indéfiniment",
    "Hide this player": "Faire disparaître",
    "Cancel": "Annuler"
  };

  // translation
  var __ = function __(msg) {
    return __translations.hasOwnProperty(msg) ? __translations[msg] : msg;
  };

  // ajax query helper
  var ajaxQuery = function ajaxQuery(url, params, success, error) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if (req.status == 200) {
          if (success) success(req);
          return;
        }
      }
      if (error) error(req);
    }
    req.send(params);
  };

  // test if we are inside an iframe
  var inIframe = function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  // start
  var init = function init(readyCallback) {
    var me = (function getSelfScript() {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; ++i) {
        var script = scripts[i];
        if ((script.getAttribute('src') || '').indexOf('ifplayer.js') > -1) {
          me = script;
        }
      }
      return me;
    })();

    var settingsFile = me.getAttribute('data-settings');
    if (!settingsFile) {
      throw new Exception('Couldn\'t initialize player: settings not found.');
    }

    ajaxQuery(settingsFile, function success(req) {
      var settings = JSON.parse(req.responseText);
      settings.me = {
        color: me.getAttribute('data-color') || '#222222',
        direct: me.getAttribute('data-direct') || false,
        name: me.getAttribute('data-name') || __('This website'),
        settings: me.getAttribute('data-settings') || ''
      }
      return readyCallback(settings);
    });
  };

  // Automatic close request
  var hasToClose = function hasToClose() {
    var hasToClose = window.localStorage.getItem('__ifplayer.close');
    var now = +new Date;
    // Permanent hide player
    if (hasToClose == '-1') {
      window.localStorage.setItem('__ifplayer.close', '-1');
      return true;
    }
    // Temporary hide player
    else if (+hasToClose > now) {
      return true;
    }
    
    delete window.localStorage['__ifplayer.close'];
    return false;
  };

  init(function ready(settings) {
    if (inIframe()) {
      return false;
    }
    
    if (settings.options.removable && hasToClose()) return 'Player automatically closed.';

    // Player can start!
    var run = function run() {
      var streamUrl = settings.urls.stream;
      var navigation = null;
      var player = null;

      var shrink = function() {
        document.body.classList.add('shrink-player');
        player.contentWindow.document.body.classList.add('shrink-player');
        window.localStorage.setItem('__ifplayer.shrink', 'shrink');
      };

      var unshrink = function() {
        document.body.classList.remove('shrink-player');
        player.contentWindow.document.body.classList.remove('shrink-player');
        window.localStorage.setItem('__ifplayer.shrink', '');
      };

      var beforeClose = function() {
        var getDelay = function(body) {
          var hideFor = body.getElementsByClassName('hide-for')[0];
          return hideFor.value;
        };
        var title = settings.me.name + ' ' + __('is a partner of') + '<a target="_blank" href="' + settings.radio.url + '">' + settings.radio.name + '</a>.';
        var body = '<label for="hide-for">' + __('How long do you want to hide this player?') + '</label>'
          + '<select id="hide-for" class="hide-for"><option value="1">1 ' + __('day') + '</option><option value="7">1 ' + __('week') + '</option><option value="30">1 ' + __('month') + '</option><option value="-1">' + __('Always') + '</option></select>';
        var popinOverlay = document.createElement('div');
        var popinWrapper = document.createElement('div');
        var popinContents = document.createElement('div');
        var popinTitle = document.createElement('div');
        var popinBody = document.createElement('div');
        var popinActions = document.createElement('div');
        popinOverlay.classList.add('popin-overlay');
        popinWrapper.classList.add('popin-wrapper');
        popinContents.classList.add('popin-contents');
        popinTitle.classList.add('popin-title');
        popinBody.classList.add('popin-body');
        popinActions.classList.add('popin-actions');
        popinOverlay.appendChild(popinWrapper);
        popinWrapper.appendChild(popinContents);
        popinContents.appendChild(popinTitle);
        popinContents.appendChild(popinBody);
        popinContents.appendChild(popinActions);
        popinTitle.innerHTML = title;
        popinBody.innerHTML = body;
        var buttonSubmit = document.createElement('button');
        var buttonClose = document.createElement('button');
        buttonSubmit.innerHTML = __('Hide this player');
        buttonClose.innerHTML = __('Cancel');
        buttonSubmit.onclick = function() {
          var days = getDelay(popinBody);
          var time = (days == '-1' ? -1 : (+(new Date) + (days * 24 * 3600 * 1000)));
          window.localStorage.setItem('__ifplayer.close', time);
          document.body.removeChild(popinOverlay);
          document.location.reload();
        };
        buttonClose.onclick = function() {
          document.body.removeChild(popinOverlay);
        };
        popinActions.appendChild(buttonSubmit);
        popinActions.appendChild(buttonClose);
        document.body.appendChild(popinOverlay);
      };

      var runNavigation = function(callback) {
        var inclusionParam = '__ifplayer=1';
        var origin = '//' + document.location.hostname;
        var url = document.location.href + (document.location.href.indexOf('?') >= 0 ? '&' : '?') + inclusionParam;
        navigation.src = url;
        var wasPopState = false;
        navigation.onload = function(e){
          e.preventDefault();
          var currentTitle = navigation.contentWindow.document.title;
          var currentUrl = navigation.contentWindow.document.location.href.split(new RegExp('&?' + inclusionParam)).join('');
          if (url.indexOf(origin) == -1 && currentUrl.indexOf('about:blank') === -1) {
            document.location.replace(currentUrl);
          }
          document.title = currentTitle;
          if (!wasPopState) {
            window.history.replaceState({url: currentUrl}, currentTitle, currentUrl);
          } else {
            wasPopState = false;
          }
          // External domain links
          var as = navigation.contentWindow.document.getElementsByTagName('a');
          for (var i = 0; i < as.length; ++i) {
            var a = as[i];
            if (!a) {
              continue;
            }
            if (a.getAttribute('href').indexOf(origin) == -1 && a.getAttribute('href').indexOf('://') > -1) { // external domain
              if (!a.getAttribute('target') || a.getAttribute('target') == '_self') {
                a.setAttribute('target', '_parent');
              }
            }
          }
          // External domain forms
          var forms = navigation.contentWindow.document.getElementsByTagName('form');
          for (var i = 0; i < forms.length; ++i) {
            var form = forms[i];
            if (!form) {
              continue;
            }
            if (form.getAttribute('action').indexOf(origin) == -1 && form.getAttribute('action').indexOf('://') > -1) { // external domain
              if (!form.getAttribute('target') || form.getAttribute('target') == '_self') {
                form.setAttribute('target', '_parent');
              }
            }
          }
          callback();
        };
        window.onpopstate = function(e) {
          e.preventDefault();
          navigation.contentWindow.location.replace(e.state.url);
          wasPopState = true;
        };
      };

      var runPlayer = function() {
        player.src = settings.urls.player + '?_settings=' + encodeURIComponent(settings.me.settings) + '&_color=' + encodeURIComponent(settings.me.color);
        player.onload = function(){
          if (settings.options.shrinkable && window.localStorage.getItem('__ifplayer.shrink') == 'shrink') {
            shrink();
          }
        };
      };

      var createPlayer = function() {
        document.body.innerHTML = '<div id="ifplayer-navigation-wrapper"><iframe id="ifplayer-navigation"></iframe></div><div id="ifplayer-player-wrapper"><iframe id="ifplayer-player"></iframe></div>';
        var metaViewport = document.createElement('meta');
        metaViewport.setAttribute('name', 'viewport');
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
        var metaIE = document.createElement('meta');
        metaIE.setAttribute('http-equiv', 'X-UA-Compatible');
        metaIE.setAttribute('content', 'IE=edge');
        document.head.appendChild(metaViewport);
        document.head.appendChild(metaIE);
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', settings.urls.css);
        document.getElementsByTagName('head')[0].appendChild(link);
        navigation = document.getElementById('ifplayer-navigation');
        player = document.getElementById('ifplayer-player');
        window.addEventListener('message', function(event){
          if (settings.options.removable && event.data.eventName == 'close-player') {
            beforeClose();
          } else if (settings.options.shrinkable && event.data.eventName == 'toggle-fold') {
            if (event.data.data.status) {
              shrink();
            } else {
              unshrink();
            }
          }
        }, false);
        runNavigation(runPlayer);
      };
      
      createPlayer();
    };

    if (settings.me.direct == 'true') {
      run();
    } else {
      window.onload = run;
    }
  });
})();
