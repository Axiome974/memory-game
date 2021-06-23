/**
 * Notre timer, il est autonome, sympa mais ne fait pas le café, hélas...
 */
class Timer{

    constructor( maxTime = 120) {
        this.maxTime = maxTime;
        this.curentTime = maxTime;
        this.htmlElement = this.createHtmlElement();
        document.getElementById("timer-container").append(this.render());
    }

    // Comme dans les autres objets, on a normalisé le rendu avec cette méthode
    createHtmlElement(){
        let element = document.createElement("div");
        element.classList = "timer-progress-bar";
        return element;
    }

    // Une méthode pour remettre le timer à 0;
    reset(){
        this.curentTime = this.maxTime;
    }

    start(){
        setTimeout( this.decrease.bind(this), 1000);
    }

    // C'est la fonction qui fait décroître le timer
    decrease(){

        if( this.curentTime > 0 ){
            this.curentTime -= 1;
            this.update();
            setTimeout( this.decrease.bind(this), 1000 );
        }else{
            // Lorsque le temps est écoulé, on déclenche un évènement personnalisé, qui est écouté par notre 'Game'
            this.htmlElement.dispatchEvent( new CustomEvent('elapsed-time'));
        }
    }

    // Cette méthode met à jour la largeur de la progressbar en fonction du temps qu'il reste;
    update(){
        let progress = Math.floor(this.curentTime / this.maxTime * 10000 )/100  ;
        this.htmlElement.style.width = progress+"%";
    }

    // Le rendu de notre élément
    render(){
        return this.htmlElement;
    }

}

