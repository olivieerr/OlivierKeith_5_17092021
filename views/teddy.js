console.log("hello world");

/*let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(params);
console.log(id);*/

class articles {
    constructor(id, color, quantity) {
        this.id = id;
        this.color = color;
        this.quantity = quantity;

    }
}

function createSticky(teddy) {

    //creation des elements HTML
    const sticky = document.createElement("div");
    const picture = document.createElement("img");
    const banniere = document.createElement("div");

    //Selection du noeud
    let elt = document.getElementById("presentation");

    //integration du conteneur principal
    elt.appendChild(sticky);
    //atrtibution d'une classe
    sticky.classList.add("solo");

    //mise en place de l'image
    sticky.appendChild(picture);
    picture.classList.add("image");
    picture.setAttribute("src", teddy.imageUrl);

    //mise en place de la div contenant le nom, la présentation et le prix des Teddies
    sticky.appendChild(banniere);
    banniere.classList.add("contenu");

    //décalration des differents elements
    let titre = document.createElement("h2");
    let description = document.createElement("p");
    let prix = document.createElement("p");

    //Mise en place des elements precedents déclarés
    banniere.appendChild(titre);
    titre.innerHTML = teddy.name;
    banniere.appendChild(description);
    description.innerHTML = teddy.description;
    banniere.appendChild(prix);
    prix.innerHTML = teddy.price /100 + " €";

    //mise en place du formulaire : couleur + bouton ajouter
    const form = document.createElement("form");
    const color = document.createElement("select");
    //const options = document.createElement("option")
    const quantity = document.createElement("select");
    const send = document.createElement("button");

    banniere.appendChild(form);
    color.classList.add("color");
    form.appendChild(color);
    color.setAttribute("id", "color");
    color.setAttribute("name", "couleur choisie");

    //boucle pour générer les differentes couleurs
    for (let i in teddy.colors){
        let options = document.createElement("option")
        color.appendChild(options);
        options.setAttribute("value", teddy.colors[i]);
        options.innerHTML = teddy.colors[i];
        console.log(teddy.colors[i]);
    }

    form.appendChild(quantity);
    quantity.classList.add("nomber");
    quantity.setAttribute("id", "quantity");
    quantity.setAttribute("name", "Quantité désirée");
    for (let i = 1; i < 11; i++) {
        let options = document.createElement("option");
        quantity.appendChild(options);

        options.innerText = i;
    }
    form.appendChild(send);
    send.classList.add("button");
    send.setAttribute("id", "btn");
    send.setAttribute("type", "button");
    send.innerHTML = "Ajouter au panier";
}

function nbTeddies () {
    let selectQuantity = document.getElementById("quantity");
    let quantity = selectQuantity.options[selectQuantity.selectedIndex].value;
    console.log("nous sommes dans fonction nbTeddies : " + quantity);
    return quantity;
}

function whatColor() {
    let selectColor = document.getElementById("color");
    let color = selectColor.options[selectColor.selectedIndex].value;
    console.log("nous sommes dans fonction whatColor : " + color);
    return color;
}

//Ecoute sur le bouton "ajouter au panier"
function sendToBasket (teddy){
    const btn = document.getElementById("btn");
    btn.addEventListener("click", function(){
        let color = whatColor();
        let quantity = nbTeddies();
        console.log("id du teddy : "+ teddy._id);
        console.log("nom du teddy : " + teddy.name);
        console.log("prix du teddy : "+teddy.price);
        console.log("quantite de teddy : "+ quantity);
        console.log("couleur du teddy : " + color);
        let beer = new articles(teddy._id, color, quantity);
        let article = JSON.parse(localStorage.getItem("article"));

        //Verification si il y a deja des objets dans le panier
        if(article) {
            article.push(beer);
            localStorage.setItem("article", JSON.stringify(article));
            console.log(article);
        }

        //sinon, on crée un tableau vide
        else {
            article = [];
            article.push(beer);
            localStorage.setItem("article", JSON.stringify(article));

            console.log(article);

        }
        console.log("le nombre total d'article dans le panier : " + article.length);
    });
}

let searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has("id"))
let id = searchParams.get("id");
console.log(id);

function getTeddy() {
    fetch("http://localhost:3000/api/teddies/" + id)
        .then(response => response.json())
        .then ((teddy) => {
            console.log(teddy);
            createSticky(teddy);
            sendToBasket(teddy);
    });
}

getTeddy();
