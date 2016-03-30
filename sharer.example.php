<?php
    $radioName = 'Utopic';
    $advertTagsArtist = 'ADVERT:TARGETSPOT';
    $radioTagsArtist = strtoupper($radioName);
    $data = file_get_contents("http://api.radionomy.com/currentsong.cfm?radiouid=d6faf3f0-6403-49ad-ab4b-2cb2d36d95a3&apikey=20904521-f9e5-4004-aa07-47fc770925aa&callmeback=yes&type=xml&cover=yes");
    $doc = DOMDocument::loadXML($data);
    $title = $doc->getElementsByTagName('title')->item(0)->nodeValue;
    $artist = $doc->getElementsByTagName('artists')->item(0)->nodeValue;
    $ref = strtoupper($artist);
    $siteTitle = 'Utopic Radio | Ta webradio 200% smile !';
    $siteDescription = 'En ce moment, j\'écoute ' . $title . ' de ' . $artist . ' sur Utopic Radio.';
    $image = 'http://utopicradio.com/theme/utopic/logo_slogan_utopic.png';
    if ($ref == $advertTagsArtist || $ref == $radioTagsArtist) {
        $description = 'En ce moment, j\'écoute Utopic Radio.';
    }
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta http-equiv="refresh" content="1; URL=/">
    <meta charset="UTF-8">
    <title><?= $siteTitle ?></title>
    <meta name="description" content="<?= $siteDescription ?>">

    <!-- for Google -->
    <meta itemprop="name" content="<?= $siteTitle ?>">
    <meta itemprop="description" content="<?= $siteDescription ?>">
    <meta itemprop="image" content="<?= $image ?>">
    <link rel="author" href=""/>
    <link rel="publisher" href=""/>

    <meta name="author" content="Utopic Radio" />
    <meta name="copyright" content="" />
    <meta name="application-name" content="Utopic Radio" />

    <!-- for Facebook -->
    <meta property="og:title" content="<?= $siteTitle ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="<?= $image ?>" />
    <meta property="og:image:url" content="<?= $image ?>" />
    <meta property="og:url" content="/">
    <meta property="og:site_name" content="Utopic Radio">
    <meta property="og:description" content="<?= $siteDescription ?>" />

    <!-- for Twitter -->
    <meta name="twitter:title" content="<?= $siteTitle ?>" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:description" content="<?= $siteDescription ?>" />
    <meta name="twitter:image" content="<?= $image ?>" />
</head>
<body>
    <h1><?= $siteTitle ?></h1>
    <p><?= $siteDescription ?></p>
    <img src="<?= $image ?>" alt="<?= $siteTitle ?>">
    <div>
        <a href="/">Cliquez ici si vous n'êtes pas redirigé.</a>
    </div>
</body>
</html>
