<?php

namespace AxiomeMemory\Database;


/**
 * Class Manager
 * @package AxiomeMemory\Database
 * Notre manager de base de données, il va nous permettre de stocker les scores et de les récupérer
 */
class Manager{

    /**
     * @var \PDO
     */
    private $pdo;

    /**
     * @var string
     */
    private $dbName;

    /**
     * @var string
     */
    private $user;

    /**
     * @var string
     */
    private $password;

    /**
     * @var mixed|string
     */
    private $host;



    public function __construct( string $dbName, string $user, string $password, $host = "localhost:8000" )
    {
        $this->pdo = new \PDO("mysql:dbname=$dbName;$host", $user, $password);
        $this->dbName = $dbName;
        $this->user = $user;
        $this->password = $password;
        $this->host = $host;
        $this->databaseSetup();
    }

    // On va s'assurer que la base de donnée contient bien les entrées nécessaires
    public function databaseSetup(){

        $pq = $this->pdo->query("SHOW TABLES FROM $this->dbName like 'scores'");
        if( count($pq->fetchAll()) === 0 ){
            $this->pdo->query("CREATE TABLE scores (name VARCHAR(255), score INT)");
        }

    }


    /**
     * @param string $name
     * @param int $score
     * @return array
     */
    public function saveScore( string $name, int $score ): array
    {
        $query = $this->pdo->prepare("INSERT INTO scores VALUES ( :name, :score)");
        $query->execute(["name" => $name, "score" => $score]);
        return $query->fetchAll();
    }

    /**
     * @return array
     * Renvoie les 10 meilleurs scores
     */
    public function getScoresAsArray( ): array
    {
        $query = $this->pdo->query("SELECT * FROM scores ORDER BY score ASC LIMIT 10");
        $players = $query->fetchAll();
        $scores = [];
        foreach ( $players as $p ){
            $scores[] = [
                "score"     => $p["score"],
                "player"    => $p["name"]
            ];
        }
        return $scores;
    }


}