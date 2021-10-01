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
    let div = document.createElement("div")
    let description = document.createElement("p");
    let left = document.createElement("div")
    let prix = document.createElement("p");

    div.classList.add("all")
    description.classList.add("right")
    left.classList.add("left")

    //Mise en place des elements precedents déclarés
    banniere.appendChild(titre);
    titre.innerHTML = allTeddies[i].name;
    banniere.appendChild(div)
    div.appendChild(description);
    description.innerHTML = allTeddies[i].description;
    div.appendChild(left);
    left.appendChild(prix)
    prix.innerHTML = allTeddies[i].price /100 + " €";
}

function noServer(){
    const noSerever = document.createElement("div")
    const oups = document.createElement("h2")
    const exp = document.createElement("p")

    let elt = document.getElementById("list")

    elt.appendChild(noSerever)
    noSerever.appendChild(oups)
    noSerever.appendChild(exp)

    noSerever.classList.add("wrong")

    oups.innerHTML = "Oups, quelque chose s'est mal passé"
    exp.innerHTML = "Verifier votre connexion à internet et/ou que le serveur soit bien allumé"
}

function getTeddies (){
    fetch("http://localhost:3000/api/teddies")
        .then(response => response.json())
        .then((allTeddies) => {
            console.log(allTeddies)
            for(let i in allTeddies) {
                createStickies(allTeddies, i)
            }
        })
        .catch((e) => {
            console.error(e)
            console.log("pas de connexion au serveur")
            noServer()
        });
}

getTeddies()



