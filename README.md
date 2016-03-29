<p style="color: red; font-weight: bold;">
DO NOT USE IT FOR NOW, DEVELOPMENTS ARE NOT YET FINISHED, BUT IT WILL BE SOON!
</p>

# IFPlayer

HTML5 Web Player for Webradios that is not intrusive.

## Features

- "Not intrusive" just means that the player will not force visitors to hear your radio when they enter your website or your partner website. Playing sound at start is the best way for visitors to quit the website and never come back, especially if they forgot that their speakers or headphones were loud…
- Allow users to shrink the player and to completely hide it temporarily (or definitively). Keep in mind that visitors doesn't like everything that looks like ads, and a webradio player is often assimilated to advertisment.
- By combinig iframes and History javascript API (no AJAX navigation), visitors will be able to navigate through the pages of your website with a continuous sound.
- Ready in 1 hour max! Use IFPlayer for your website and your partners' ones.
- Just include a small script and IFPlayer do the rest for you!
- Automatic facebook and twitter share scripts

## Compatibility

Coming soon…

## Implementation guide

### For developers

1. **Requirements**

  The player is developed in PHP. It has to be hosted on your server. You can create a folder on your website where you will put all files. Then, all of your websites and your partners websites can add it just by adding a script inside HTML sources.
  By the way to display tags, this player do recurrent AJAX calls to a script that you will have to implement (see below).

2. **Tags provider**

  Wherever you want on your server, you will have to put a small script (PHP or any other language else), that will prints out a small JSON object like that:
  
  ```json
  {
    "artist": "The Alan Parsons Project",
    "title": "Eye In The Sky"
  }
  ```
  
  Feel free to reuse this script everywhere you need to display the music's tags currently playing on your station. This JSON format is not fixed, so you can add fields like cover art URL, year, etc.
  
  *NOTE: Just keep in mind that this kind of script can send the tags of a jingle or no tags if the music currently playing doesn't provide ones. So you will have to implement those cases by puting default tags (like your radio station as artist and your slogan as title, for example).*
  
3. **Facebook and Twitter automatic sharing links**

  Coming soon…

4. **(Optional) Sound processing with JSSP**
  
  IFPlayer can be plugged to [JSSP](http://jssp.c-mh.fr). Read JSSP documentation to know how to provide the JSSP settings URL. If you don't use JSSP, IFPlayer will omit it.
  
5. **Detailed settings (ifpsettings.json)**

  ```json
  {
    "radio": {
      "name": "Utopic Radio",
      "slogan": "Ta webradio 200% smile",
      "url": "http://utopicradio.com/",
      "logo": "http://utopicradio.com/logo.png"
    },
    "urls": {
      "stream": "//utopicradio.com/listen.mp3",
      "tags": "//utopicradio.com/tags",
      "css": "//utopicradio.com/player/ifplayer.css",
      "player": "//utopicradio.com/player/ifplayer.php",
      "sp": "//utopicradio.com/player/sp.php"
    },
    "options": {
      "autoplay": false,
      "shrinkable": true,
      "removable": true
    }
  }
  ```
  
  - **radio.name**: Name of your radio
  - **radio.slogan**: Slogan of your radio
  - **radio.url**: URL of your radio website
  - **radio.logo**: URL of your radio logo (SVG accepted)
  - **urls.stream**: URL of your stream *(WARNING: if you can configure your Apache or Nginx server, create a proxy on a specific URL that will mask the usage of a port. Frequently, Shoutcast or Icecast servers stream sound on 8000, which is not accessible behind some firewalls.)*
  - **urls.tags**: URL of your tags provider (see above)
  - **urls.css**: URL of IFPlayer CSS
  - **urls.player**: URL of IFPlayer PHP script
  - **urls.sp**: (optional) URL of your JSSP settings
  - **options.autoplay**: set to true if you want the player to play sound at page loading (not recommended)
  - **options.shrinkable**: set to true if you want to allow visitors to shrink player (recommended)
  - **options.removable**: set to true if you want to allow visitors to remove the player from the website they are visiting (not recommended on your own website, but recommended on your partners websites)

6. **Add it on your website**

  ```html
  <script
    src="//mysite.com/player/ifplayer.js"
    data-settings="//mysite.com/player/ifpsettings.json"
    data-color="#222222"
    [data-direct="true"]>
  </script>
  ```

  - **src**: path to IFPlayer script that you host on your server
  - **data-settings**: URL to your ifpsettings.json
  - **data-color**: you can choose a color for the player that will match your graphical charter. Default is #222222.
  - **data-direct**: (not recommended) if true, player will be initialized without waiting for page load. Can be useful for javascript delayed creation of this script tag.

### Also usable on your partners websites

Now that you host your own awesome and wonderful webradio player, you can propose it to your partners. They will just have to include this small script in their website and IFPlayer does the rest.

  ```html
  <script
    src="//mysite.com/player/ifplayer.js"
    data-settings="//mysite.com/player/ifpsettings.json"
    data-color="#222222"
    data-name="This website name"
    [data-direct="true"]>
  </script>
  ```
  
  - **data-name**: Required for your partners, they will have to add their website name. It is used inside the modal window that asks for how long the visitor wants to hide the player.
  
  If you need to provide another settings file to your partners, you may change the data-settings attribute.
  
## Todo

- Complete documentation
- Improve translations and multilingual
- Probably other improvements about navigation detection

Feel free to pull requests and submit issues if you experience some.
