console.log("hello world");

function createStickies(allTeddies, i) {
    
    //Mise en place des elements structurant le HTML
    const stickies = document.createElement("div");
    const testA = document.createElement("a");
    const picture = document.createElement("img");
    const banniere = document.createElement("div"); //todo trouver un meilleur nom pour "banniere" ?
    let elt = document.getElementById("list");

    //integration du conteneur principal
    elt.appendChild(stickies);
    //atrtibution d'une classe
    stickies.classList.add("etiquette");

    //Mise en place du lien
    stickies.appendChild(testA);
    testA.setAttribute("href", "product.html?id=" + allTeddies[i]._id);
    testA.classList.add("lien");

    //mise en place de l'image
    testA.appendChild(picture);
    picture.classList.add("image");
    picture.setAttribute("src", allTeddies[i].imageUrl);

    //mise en place de la div contenant le nom, la présentation et le prix des Teddies
    testA.appendChild(banniere);
    banniere.classList.add("contenu");

    //décalration des differents elements
    let titre = document.createElement("h2");
    let description = document.createElement("p");
    let prix = document.createElement("p");

    //Mise en place des elements precedents déclarés
    banniere.appendChild(titre);
    titre.innerHTML = allTeddies[i].name;
    banniere.appendChild(description);
    description.innerHTML = allTeddies[i].description;
    banniere.appendChild(prix);
    prix.innerHTML = allTeddies[i].price /100 + " €";
}

function getTeddies (){
    fetch("http://localhost:3000/api/teddies")
        .then(response => response.json())
        .then((allTeddies) => {
            console.log(allTeddies)
            for(let i in allTeddies) {
                createStickies(allTeddies, i)
            }
        });
}

getTeddies()



