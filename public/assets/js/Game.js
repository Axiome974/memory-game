/**
 * La classe game contient notre jeu, les règles que nous lui avons fixé, c'est elle qui initialise le deck et écoute les évènements. Elle manipule la partie, selon ce qui s'y passe:
 *  -> lorsqu'on clique sur une carte
 *  -> lorsque le timer est écoulé
 *  -> lorsque deux cartes sont identiques
 *  -> lorsque deux cartes ne sont pas les mêmes
 *  -> lorsque toutes les cartes ont été retournées
 *
 *  ________________________________________________________________________________________________________________________________________________________________
 *  Aller plus loin: Créer une 'Game' avec des options en attribut. ces options pourraient être réglées par l'utilisateur. Elle lui permettrai de choisir le timer,
 *  le nombre de cartes et pour aller encore plus loin un thème différent!
 */
class Game {

    constructor() {
        this.deck = new Deck(5);
        this.timer = new Timer(120);
        this.score = 0;
        this.guess = null;
    }

    // Le jeu commence ici
    start(){
        this.deck.shuffleDeck();
        this.deck.render();
        this.timer.start();
        this.initEventListeners();
    }

    // C'est dans cette méthode que nous allons écouter les évènements
    initEventListeners(){
        let cards = document.getElementsByClassName("card");
        // Pour chaque carte, nous allons écouter l'évènement click et voir s'il y a matching avec une autre carte
        [...cards].map( e => {
            e.addEventListener( "click", this.checkMatching.bind(this) );
        })

        // Nous écouterons le timer avec un custom event émis par celui ci lorsqu'il atteind 0
        this.timer.htmlElement.addEventListener("elapsed-time", this.gameOver );
    }


    // C'est ici que la magie opère, nous allons étudier ce qu'il y a sur le plateau, en quelques conditions nous saurons si le joueur a gagné ou si une carte est retourné
    checkMatching(){

        // Nous allons récupérer les cartes ayant la class show
        let revealed = document.getElementsByClassName("show");
        revealed = [...revealed];

        // S'il n'y a pas deux cartes à comparer, et bien nous ne comparons pas... Logique non ?
        if( revealed.length <= 1 ){
            return false;
        }

        // Ici nous allons simplement voir si les cartes visibles sont identiques, c'est à dire qu'elles comportent bien les mêmes classes
        if( revealed[0].classList.value === revealed[1].classList.value ){
            revealed[0].classList.add("success");
            revealed[1].classList.add("success");
            revealed[0].classList.remove("show");
            revealed[1].classList.remove("show");
            this.score ++;
            this.checkGameStatus();
            return true;
        }else{
            setTimeout( () => {
                console.log(revealed[0]);
                revealed[0].classList = "card hidden";
                revealed[1].classList = "card hidden";
            }, 700);

        }

    }

    // Cette méthode compare simplement le score sur le plateau, est il égale à la quantité de fruits à trouver
    checkGameStatus(){
        if(this.score === this.deck.quantity ){
            setTimeout( this.winGame.bind(this), 500);
        }
    }

    // Le fameux game over, le code parle de lui même
    gameOver(){
        alert("Game Over !");
        window.location = "/";
    }

    // On a gagné, on va donc poster le nom et le score du joueur pour l'nregistrer dans le tableau des scores
    winGame(){

        // Nous allons calculer le score et demander au joueur son pseudo, afin qu'il soit couronné de succès!
        let score = this.timer.maxTime - this.timer.curentTime;
        let name = null;
        do{
            name = window.prompt("Bravo, vous avez gagné!!! Votre score: "+score+" secondes.", "Votre nom");
        }while (name === "" || name === null);

        // Pour éviter la triche, on va poster notre score et non pas l'envoyer vers une query, lorsqu'il y aura eu réponse du serveur, on redirigera l'utilisateur vers la page d'accueil
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/winthegame', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                window.location = "/";
            }
        }
        xhr.send("name="+name+"&score="+score);
    }


}
