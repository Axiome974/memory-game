/**
 * Le deck (paquet de carte).
 * C'est notre objet paquet de carte, qui contient tous nos objets 'Cards', plusieurs méthodes lui sont implémentées:
 * -> initDeck()
 * -> shuffleDeck()
 * -> render()
 */
class Deck{

    // Notre constructeur, pour plus de fun on a laissé la possibilité de choisir le nombre de fruits dans le paquet. PLus tard, pour aller plus loin, la quantité sera personnalisable par le joueur.
    constructor( fruits = 18 ) {

        // On met la valeur à 18 si le nombre de fruits passés en argument n'est pas compris entre 1 et 18, ce choix est personnel.
        if( fruits < 1 || fruits > 18 ){
            console.log( "Erreur: Bad fruit argument value, rounded to 18." );
            fruits = 18;
        }

        this.quantity = fruits;
        this.cards = [];
        this.initDeck();
    }

    // initialise le deck dans l'ordre en y ins&rant les paires
    initDeck(){
        let cards = [];
        for( let i = 0; i < this.quantity; i ++){
            // Chaque carte est insérée par deux dans le deck, et oui, ce sont des paires
            cards.push(new Card(i));
            cards.push(new Card(i));
        }
        this.cards = cards;
        return cards;
    }

    // Ici nous mélangeons le deck. Comment? On clone l'attribut 'cards', tant que la pile n'est pas vide, on selectionne une carte au hasard, on la met à la suite de shuffleDeck et on la retire de 'cards'
    shuffleDeck(){
        let cards = [...this.cards];
        let shuffledDeck = [];
        while( cards.length > 0 ){
            let randomElement = cards.splice( Math.floor(Math.random() * cards.length ), 1 );
            shuffledDeck.push(randomElement[0]);
        }
        this.cards = shuffledDeck;
    }

    // Ici, comme dans les autres objets, de notre jeu, on affiche les cartes.
    render(){
        let boardElement = document.getElementById("board");
        this.cards.forEach( e => {
            boardElement.append(e.render());
        })
    }

}