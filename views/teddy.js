console.log("hello world");

//constante globale
const send = document.createElement("button");

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
    let all = document.createElement("div")
    let description = document.createElement("p");
    let left = document.createElement("div")
    let prix = document.createElement("p");

    all.classList.add("all")
    description.classList.add("right")
    left.classList.add("left")
    titre.classList.add("pink")
    prix.classList.add("pink")

    //Mise en place des elements precedents déclarés
    banniere.appendChild(titre);
    titre.innerHTML = teddy.name;
    banniere.appendChild(all);
    all.appendChild(description)
    description.innerHTML = teddy.description;
    all.appendChild(left)
    left.appendChild(prix);
    prix.innerHTML = teddy.price /100 + " €";

    //mise en place du formulaire : couleur + bouton ajouter
    const form = document.createElement("form");
    const color = document.createElement("select");
    //const options = document.createElement("option")
    const quantity = document.createElement("select");
    //const send = document.createElement("button");

    banniere.appendChild(form);
    color.classList.add("color");
    quantity.classList.add("alignEnd")
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

//fonction permettant de récupéré la quantité de produit désirée
function nbTeddies () {
    let selectQuantity = document.getElementById("quantity");
    let quantity = selectQuantity.options[selectQuantity.selectedIndex].value;
    console.log("nous sommes dans fonction nbTeddies : " + quantity);
    return quantity;
}

//Fonction permettant de recupéré la couleur du produit désiré
function whatColor() {
    let selectColor = document.getElementById("color");
    let color = selectColor.options[selectColor.selectedIndex].value;
    console.log("nous sommes dans fonction whatColor : " + color);
    return color;
}

//fonction en cas d'échec de contacter le serveur
function noServer() {
    const noSerever = document.createElement("div")
    const oups = document.createElement("h2")
    const exp = document.createElement("p")

    let elt = document.getElementById("presentation")

    elt.appendChild(noSerever)
    noSerever.appendChild(oups)
    noSerever.appendChild(exp)

    noSerever.classList.add("info")

    oups.innerHTML = "Oups, quelque chose s'est mal passé"
    exp.innerHTML = "Verifier votre connexion à internet et/ou que le serveur soit bien allumé"
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
        send.classList.add("green")
        send.innerHTML = "ajouté !"
    });
}

//Récupération des informations récues de la pages précedente
let searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has("id"))
let id = searchParams.get("id");
console.log(id);

//fonction récupérant les information envoyées en d'afficher le bon produit
function getTeddy() {
    fetch("http://localhost:3000/api/teddies/" + id)
        .then(response => response.json())
        .then ((teddy) => {
            console.log(teddy);
            createSticky(teddy);
            sendToBasket(teddy);
    })
        .catch((e) => {
            console.error(e)
            console.log("problème de connexion au serveur")
            noServer()
        });
}

getTeddy();
