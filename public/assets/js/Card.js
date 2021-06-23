class Card{

    constructor( fruit ) {
        this.fruit = fruit;
        this.hidden = true;
        this.htmlElement = this.createElement();
        this.initEventListener();
    }

    // Cette méthode nous permet d'initialiser les écouteurs d'évènements
    initEventListener(){
        this.htmlElement.addEventListener("click", this.onClick.bind(this) );
    }

    // C'est ici que l'on va générer le code html de notre carte (par défaut)
    createElement(){
        let divElement = document.createElement("a");
        divElement.classList = "card hidden";
        divElement.href = "#";
        divElement.draggable = false;
        return divElement;
    }

    // Le comportement au click, il y a un certain nombre de paramètres à prendre en compte pour interpréter le click.
    onClick(){
        let shownElements = document.getElementsByClassName("show");
        if( shownElements.length > 1 ){
            return false;
        }
        if( this.htmlElement.classList.contains("success") ){
            return false;
        }

        this.show();
    }


    render(){
        return this.htmlElement;
    }

    hide(){
        this.htmlElement.classList.add("hidden");
        this.htmlElement.classList.remove("show");
        this.htmlElement.classList.remove("item-"+this.fruit);
        this.hidden = true;
    }

    show(){
        this.htmlElement.classList.remove("hidden");
        this.htmlElement.classList.add("show");
        this.htmlElement.classList.add("item-"+this.fruit);
        this.hidden = false;
        this.htmlElement.dispatchEvent(new CustomEvent("card-revealed", {
           detail: this
        }));
    }

    getFruit(){
        return this.fruit;
    }

    match(){

    }


}
