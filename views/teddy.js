console.log("hello world");

/*let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(params);
console.log(id);*/

function createSticky(teddy) {

    //creation des elements HTML
    const sticky = document.createElement("div");
    const picture = document.createElement("img");
    const banniere = document.createElement("div"); //todo trouver un meilleur nom pour "banniere" ?

    //Selection du noeud
    let elt = document.getElementById("presentation");

    //integration du conteneur principal
    elt.appendChild(sticky);
    //atrtibution d'une classe
    sticky.classList.add("etiquette"); //todo changer le nom de la classe

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
    color.setAttribute("name", "couleur choisie");

    //boucle pour générer les differentes couleurs
    for (let i in teddy.colors){
        let options = document.createElement("option")
        color.appendChild(options);
        options.innerHTML = teddy.colors[i];
        console.log(teddy.colors[i]);
    }

    form.appendChild(quantity);
    quantity.classList.add("nomber");
    quantity.setAttribute("name", "Quantité désirée");

    for (let i = 1; i < 11; i++) {
        let options = document.createElement("option");
        quantity.appendChild(options);
        options.innerText = i;
    }


    form.appendChild(send);
    send.classList.add("button");
    send.setAttribute("type", "button");
    send.innerHTML = "Ajouter au panier";









}

/*let params = new URLSearchParams(document.location);
let id = params.get("id");*/

let params = new URL(document.location).searchParams;
let id = params.get("id");

console.log(id);
console.log(window.location)

let searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has("id"))
console.log(id);


function getTeddy() {
    fetch("http://localhost:3000/api/teddies/" + id)
        .then(response => response.json())
        .then ((teddy) => {
            console.log(teddy);
            createSticky(teddy);
    });
}

getTeddy()
