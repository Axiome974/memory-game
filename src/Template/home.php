<div class="game-title">
    <h1>Memory game</h1>
</div>

<div class="score-board">
    <h2 style="text-align: center">Meilleurs scores</h2>
    <table class="table">
        <thead>
        <tr>
            <th>Rang</th>
            <th>Joueur</th>
            <th>Score</th>
        </tr>
        </thead>
        <tbody>
        <?=  $scores ?? "" ?>
        </tbody>
    </table>
</div>

<a href="/game" class="btn-new-game">Nouvelle partie!</a>
