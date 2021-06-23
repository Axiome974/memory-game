<?php

namespace AxiomeMemory\Helpers;

use AxiomeMemory\Database\Manager;

/**
 * Class ScoreHelper
 * @package AxiomeMemory\Helpers
 * Une petite class helper, on va l'utiliser pour générer du code html dynamiquement
 */
class ScoreHelper{

    public static function getTableLines( Manager $manager ):string
    {
        $scores = $manager->getScoresAsArray();
        $html = "";
        if( !empty($scores) ){
            $count = 1;
            foreach ( $scores as $s ){
                $html .= "<tr> <td>$count</td> <td>".$s['player']."</td><td>".$s["score"]." secondes</td></tr>";
                $count++;
            }
            return $html;
        }
        return "<tr><td colspan='3'>Aucun score</td></tr>";
    }
}