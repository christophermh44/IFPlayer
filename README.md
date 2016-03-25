# IFPlayer

HTML5 Web Player for Webradios that is not intrusive.

## Documentation

1. Call your player on your webpage by inserting this tag:

  ```html
  <script
    src="//mysite.com/player/ifplayer.js"
    data-settings="//mysite.com/player/ifpsettings.json"
    data-color="#222222"
    [data-name="This website name"]
    [data-direct="true"]>
  </script>
  ```
  
2. Create ifpsettings.json

  ```json
  {
    "radio": {
      "name": "Utopic Radio",
      "slogan": "Ta webradio 200% smile",
      "url": "http://utopicradio.com/"
    },
    "urls": {
      "stream": "//utopicradio.com/listen.mp3",
      "tags": "//utopicradio.com/tags",
      "css": "//utopicradio.com/player/ifplayer.css",
      "player": "//utopicradio.com/player/ifplayer.php"
    },
    "options": {
      "autoplay": false,
      "shrinkable": true,
      "removable": true
    }
  }
  ```

## Todo

- Complete documentation
- Improve translations and multilingual
- Probably other improvements about navigation detection

Feel free to pull requests and submit issues if you experience some.
