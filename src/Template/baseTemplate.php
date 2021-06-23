<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Memory Game</title>
    <link rel="stylesheet" href="assets/style/style.css">

    <!-- Quelques google fonts pour un peu plus de style, utilisons le CDN, c'est plus rapide ;) -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;500&display=swap" rel="stylesheet">

</head>
<body>
<div class="container">
<?= $pageContent ?? "" ?>
</div>
<!-- Ici on importe nos fichiers JS pour faire fonctionner le jeu -->
<script type="text/javascript" src="assets/js/Card.js"></script>
<script type="text/javascript" src="assets/js/Deck.js"></script>
<script type="text/javascript" src="assets/js/Game.js"></script>
<script type="text/javascript" src="assets/js/Timer.js"></script>
<script type="text/javascript" src="assets/js/index.js"></script>

</body>
</html>
