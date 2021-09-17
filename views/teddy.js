

console.log("hello world");

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
    sticky.classList.add("etiquette");

    //mise en place de l'image
    sticky.appendChild(picture);
    picture.classList.add("image");
    picture.setAttribute("src", "http://localhost:3000/images/teddy_1.jpg");

    //mise en place de la div contenant le nom, la présentation et le prix des Teddies
    testA.appendChild(banniere);
    banniere.classList.add("contenu");

    //décalration des differents elements
    let titre = document.createElement("h2");
    let description = document.createElement("p");
    let prix = document.createElement("p");

    //Mise en place des elements precedents déclarés
    banniere.appendChild(titre);
    titre.innerHTML = "Norbert";
    banniere.appendChild(description);
    description.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    banniere.appendChild(prix);
    prix.innerHTML = "29€";

}

let params = new URL(document.location).searchParams;
let id = params.get("id");
function getTeddy() {
    fetch("http://localhost:3000/api/teddies/${id}")
        .then(response => response.json())
        .then ((teddy) => {
            console.log(teddy);
    });
}

getTeddy()
