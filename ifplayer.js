(function IFPlayer(){
  'use strict';

  var inclusionParam = '__ifplayer=1';

  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

(function(l,n){function m(a,b){for(var c in a)a.hasOwnProperty(c)&&b(c,a[c])}var g=encodeURIComponent,h=decodeURIComponent;l.Cookie={createCookieString:function(a,b,c,d){d=d||{};a=g(a)+"="+(c?g(b):b);b=d.expires;c=d.path||"/";var e=d.domain;if("object"===typeof d){if(b instanceof Date)a+="; expires="+b.toUTCString();else if(!isNaN(parseFloat(b))&&isFinite(b)){var f=new Date;f.setDate(f.getDate()+b);a+="; expires="+f.toUTCString()}"string"===typeof c&&""!==c&&(a+="; path="+c);"string"===typeof e&&
""!==e&&(a+="; domain="+e);!0===d.secure&&(a+="; secure")}return a},createCookieHashString:function(a){if("object"!==typeof a)return"";var b=[];m(a,function(a,d){"function"!==typeof d&&"undefined"!==typeof d&&b.push(g(a)+"="+g(String(d)))});return b.join("&")},parseCookieHash:function(a){var b=a.split("&"),c=null,d={};if(a.length){a=0;for(var e=b.length;a<e;a++)c=b[a].split("="),d[h(c[0])]=h(c[1])}return d},parseCookieString:function(a,b,c){var d={};if("string"===typeof a&&0<a.length){b=!1===b?function(a){return a}:
h;a=a.split(/;\s/g);for(var e=null,f=null,g=null,k=0,l=a.length;k<l;k++){g=a[k].match(/([^=]+)=/i);if(g instanceof Array)try{e=h(g[1]),f=b(a[k].substring(g[1].length+1))}catch(p){}else e=h(a[k]),f="";"undefined"!==typeof c&&c.reverseCookieLoading?"undefined"===typeof d[e]&&(d[e]=f):d[e]=f}}return d},exists:function(a){return"string"!==typeof a||""===a?!1:this.parseCookieString(document.cookie,!0).hasOwnProperty(a)},get:function(a,b){var c,d;"function"===typeof b?(d=b,b={}):"object"===typeof b?d=b.converter:
b={};c=this.parseCookieString(document.cookie,!b.raw,b)[a];return"undefined"===typeof c?null:"function"===typeof d?d(c):c},getSub:function(a,b,c,d){a=this.getSubs(a,d);return null===a||"string"!==typeof b||""===b||"undefined"===typeof a[b]?null:"function"===typeof c?c(a[b]):a[b]},getSubs:function(a,b){var c=this.parseCookieString(document.cookie,!1,b);return"string"===typeof c[a]?this.parseCookieHash(c[a]):null},remove:function(a,b){if("string"!==typeof a||""===a)return"";var c=b||{},d={expires:new Date(0)};
if(c instanceof Array)b=c.concat(d);else{var e={},f;for(f in c)c.hasOwnProperty(f)&&(e[f]=c[f]);for(f in d)d.hasOwnProperty(f)&&(e[f]=d[f]);b=e}return this.set(a,"",b)},removeSub:function(a,b,c){if("string"!==typeof a||""===a||"string"!==typeof b||""===b)return"";c=c||{};var d=this.getSubs(a);if("object"===typeof d&&d.hasOwnProperty(b)){delete d[b];if(c.removeIfEmpty){for(var e in d)if(d.hasOwnProperty(e)&&"function"!==typeof d[e]&&"undefined"!==typeof d[e])return this.setSubs(a,d,c);return this.remove(a,
c)}return this.setSubs(a,d,c)}return""},set:function(a,b,c){if("string"!==typeof a||""===a||"undefined"===typeof b)return null;c=c||{};a=this.createCookieString(a,b,!c.raw,c);return document.cookie=a},setSub:function(a,b,c,d){if("string"!==typeof a||""===a||"string"!==typeof b||""===b||"undefined"===typeof c)return"";var e=this.getSubs(a);e||(e={});e[b]=c;return this.setSubs(a,e,d)},setSubs:function(a,b,c){if("string"!==typeof a||""===a||"object"!==typeof b)return"";a=this.createCookieString(a,this.createCookieHashString(b),
!1,c);return document.cookie=a},enabled:function(){return navigator.cookieEnabled},clear:function(){for(var a=document.cookie.split(";"),b=0;b<a.length;b++){var c=a[b],d=c.indexOf("="),c=-1<d?c.substr(0,d):c;document.cookie=c+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"}}}})(window);

  var now = +(new Date);
  var closeCookie = Cookie.get('__ifplayer.close');
  if (closeCookie == '-1') {
    Cookie.set('__ifplayer.close', '-1', {expires: 366});
    return;
  } else if (+closeCookie > now) {
    return;
  }

  Cookie.remove('__ifplayer.close');

  if (!inIframe()) {
    var me = null;
    var meColor = '#222222';
    var meDirect = false;
    var meName = 'Ce site';

    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; ++i) {
      var script = scripts[i];
      if ((script.getAttribute('src') || '').indexOf('ifplayer.js') > -1) {
        me = script;
      }
    }
    meColor = me.getAttribute('data-color') || '#222222';
    meDirect = me.getAttribute('data-direct') || false;
    meName = me.getAttribute('data-name') || 'Ce site';

    var run = function(){
      var streamUrl = 'URL DE VOTRE FLUX ICI';
      var navigation = null;
      var player = null;

      var shrink = function(){
        document.body.classList.add('shrink-player');
        player.contentWindow.document.body.classList.add('shrink-player');
        Cookie.set('__ifplayer.shrink', 'shrink', {expires: 366});
      };

      var unshrink = function(){
        document.body.classList.remove('shrink-player');
        player.contentWindow.document.body.classList.remove('shrink-player');
        Cookie.set('__player.shrink', '', {expires: 366});
      };

      var beforeClose = function() {
        var getDelay = function(body) {
          var hideFor = body.getElementsByClassName('hide-for')[0];
          return hideFor.value;
        };

        var title = meName + ' est partenaire d\'<a target="_blank" href="URL DE VOTRE SITE ICI">NOM DE VOTRE RADIO ICI</a>.';
        var body = '<label for="hide-for">Pour combien de temps souhaitez-vous masquer le player&nbsp;?</label>'
          + '<select id="hide-for" class="hide-for"><option value="1">1 jour</option><option value="7">1 semaine</option><option value="30">1 mois</option><option value="-1">Indéfiniment</option></select>'
          + '<p class="details">La fermeture du player utilise un cookie.</p>';
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
        buttonSubmit.innerHTML = 'Faire disparaître';
        buttonClose.innerHTML = 'Annuler';
        buttonSubmit.onclick = function() {
          var days = getDelay(popinBody);
          var time = (days == '-1' ? -1 : (+(new Date) + (days * 24 * 3600 * 1000)));
          Cookie.set('_ifplayer.close', time, {expires: days == '-1' ? 366 : days});
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

      var init = function(){
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
        link.setAttribute('href', 'ifplayer.css');
        document.getElementsByTagName('head')[0].appendChild(link);
        navigation = document.getElementById('ifplayer-navigation');
        player = document.getElementById('ifplayer-player');

        window.addEventListener('message', function(event){
          if (event.data.eventName == 'close-player') {
            beforeClose();
          } else if (event.data.eventName == 'toggle-fold') {
            if (event.data.data.status) {
              shrink();
            } else {
              unshrink();
            }
          }
        }, false);
      };

      var origin = '//' + document.location.hostname;

      var isNotOnSameDomain = function(url) {
        return url.indexOf(origin) == -1;
      };

      var runNavigation = function(callback){
        var url = document.location.href + (document.location.href.indexOf('?') >= 0 ? '&' : '?') + inclusionParam;
        navigation.src = url;
        var wasPopState = false;
        navigation.onload = function(e){
          e.preventDefault();
          var currentTitle = navigation.contentWindow.document.title;
          var currentUrl = navigation.contentWindow.document.location.href.split(new RegExp('&?' + inclusionParam)).join('');
          if (isNotOnSameDomain(currentUrl) && currentUrl.indexOf('about:blank') === -1) {
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

          callback({color: meColor});
        };
        window.onpopstate = function(e){
          e.preventDefault();
          navigation.contentWindow.location.replace(e.state.url);
          wasPopState = true;
        };
      };

      var runPlayer = function(options){
        player.src = 'ifplayer.php?color=' + encodeURIComponent(options.color);
        player.onload = function(){
          if (Cookie.get('__ifplayer.shrink') == 'shrink') {
            shrink();
          }
        };
      };

      init();
      runNavigation(function(options){
        runPlayer(options);
      });
    }

    if (meDirect == 'true') {
      run();
    } else {
      window.onload = run;
    }
  }
})();
