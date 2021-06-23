<?php
// On utilise l'autloader de Composer, attention, pour ce faire il faut respecter les standards psr-4 et le bon nommage des espaces de travail
require "../vendor/autoload.php";
use AxiomeMemory\Database\Manager;
use AxiomeMemory\Helpers\ScoreHelper;

// C'est ici qu'on va modifier les paramètres d'accès à la base de données, oui c'est pas très sécurisé mais pour le jeu que nous faisons c'est largement suffisant :D
const PARAMS = [
    "dbname"    => "memory",
    "user"      => "root",
    "password"  => "1234"
];

//un petit tricks pour créer des variables à partir d'un tableau
extract(PARAMS);
$manager = new Manager($dbname, $user, $password);


//Voici un petit système de routing maison, plus tard vous apprendrez à utiliser des routers performants
$route = $_SERVER["REQUEST_URI"];
ob_start();
switch ( $route ){

    // Accueil
    case "/":
        $scores = ScoreHelper::getTableLines($manager);
        require "../src/Template/home.php";
        break;

    // Victoire et sauvegarde du score
    case "/winthegame":
        if( isset($_POST["name"]) && isset($_POST['score'])){
            $manager->saveScore($_POST["name"], $_POST["score"]);
        }
        break;

    // La page de jeu
    case "/game":
        require "../src/Template/game.php";
        break;

    // La page 404
    default:
        require "../src/Template/page404.php";
}

$pageContent = ob_get_clean();
require "../src/Template/baseTemplate.php";






