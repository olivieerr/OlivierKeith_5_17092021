console.log("Hello world");

//Rappel de nos données stockées dans le localStorage
let article = JSON.parse(localStorage.getItem("article"));

//variables et constantes gloables
let totaux = 0;
const globalPrice = document.createElement("p");
let regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexAddress = /\d([ ])(\w+[ ]?)+/;


function createTitle() {
    const title = document.createElement("h1");

    let elt = document.getElementById("basket");

    elt.appendChild(title);

    title.classList.add("center")

    title.innerHTML = "Votre sélection";

}

function noServer() {
    const noSerever = document.createElement("div")
    const oups = document.createElement("h2")
    const exp = document.createElement("p")

    let elt = document.getElementById("basket")

    elt.appendChild(noSerever)
    noSerever.appendChild(oups)
    noSerever.appendChild(exp)

    noSerever.classList.add("info")

    oups.innerHTML = "Oups, quelque chose s'est mal passé"
    exp.innerHTML = "Verifier votre connexion à internet et/ou que le serveur soit bien allumé"
}

//creation des élements du panier
function createBasket(article,teddy, i) {
    const orderLine = document.createElement("div");


    let elt= document.getElementById("basket");
    console.log(elt);


    elt.appendChild(orderLine);
    orderLine.classList.add("line");

    const image = document.createElement("img");
    const group = document.createElement("div")
    const name = document.createElement("h2");
    const color = document.createElement("p");
    const quantity = document.createElement("p");
    const price = document.createElement("p");
    const total = document.createElement("p");

    orderLine.appendChild(image);
    orderLine.appendChild(group)
    group.appendChild(name);
    group.appendChild(color);
    group.appendChild(quantity);
    orderLine.appendChild(price);
    orderLine.appendChild(total);

    //ajout des attributs particliers
    image.classList.add("minusImg");
    image.setAttribute( "src", teddy.imageUrl);

    name.classList.add("pink")
    group.classList.add("group")
    total.classList.add("end")

    //ajout de la classe "elastic"
    name.classList.add("elastic")
    color.classList.add("elastic")
    quantity.classList.add("elastic")

    //injection des elements
    name.innerHTML = teddy.name;
    color.innerHTML = "Couleur choisie : " + article[i].color;
    quantity.innerHTML = "Quantité désirée : " + article[i].quantity;
    price.innerHTML = "Prix unitaire : " + teddy.price /100 + " €";
    total.innerHTML = "Total : " + article[i].quantity * teddy.price / 100 + " €";

}

function createTotal () {
    const orderGlobalPrice = document.createElement("div")

    let elt = document.getElementById("price");

    elt.appendChild(orderGlobalPrice);
    orderGlobalPrice.classList.add("global");
    orderGlobalPrice.appendChild(globalPrice)

}

function createForm() {

    //création des elements du formulaire
    const form = document.createElement("form");
    const title = document.createElement("h2");
    const firstName = document.createElement("input");
    const lastName = document.createElement("input");
    const address = document.createElement("input");
    const city = document.createElement("input");
    const email = document.createElement("input");
    const send = document.createElement("input");

    //Selection du noeud
    let elt = document.getElementById("form");

    //Mise en place des elements créés
    elt.appendChild(form);
    form.appendChild(title);
    form.appendChild(firstName);
    form.appendChild(lastName);
    form.appendChild(address);
    form.appendChild(city);
    form.appendChild(email);
    form.appendChild(send);

    //Mise en place des attibuts
    form.setAttribute("method", "POST");
    form.classList.add("formulaire")
    //form.setAttribute("action", "http://localhost:3000/api/teddies/")
    title.setAttribute("id", "coord")
    title.innerHTML = "Vos coordonnées"
    firstName.setAttribute("type", "text");
    firstName.setAttribute("id", "firstName");
    firstName.setAttribute("placeholder", "Votre nom")
    firstName.setAttribute("value", "test")
    lastName.setAttribute("type", "text");
    lastName.setAttribute("id", "lastName");
    lastName.setAttribute("placeholder", "Votre prénom")
    lastName.setAttribute("value", "test")
    address.setAttribute("type", "text");
    address.setAttribute("id", "address");
    address.setAttribute("placeholder", "Votre adresse")
    address.setAttribute("value", "10 rue de ci")
    city.setAttribute("type", "text");
    city.setAttribute("id", "city");
    city.setAttribute("placeholder", "Votre ville")
    city.setAttribute("value", "berg")
    email.setAttribute("type", "text");
    email.setAttribute("id", "email");
    email.setAttribute("placeholder", "votre adresse mail")
    email.setAttribute("value", "test@res.co")
    send.setAttribute("id", "validate")
    send.setAttribute("type", "button");
    send.setAttribute("value", "Valider");

}

function validateOrder(article) {
    const btn = document.getElementById("validate")
    console.log(btn)
    btn.addEventListener("click", function () {
        console.log("clic ok")


        //variable recuperées du formulaire attendue par le backend
        let firstName = document.getElementById("firstName")
        let lastName = document.getElementById("lastName")
        let address = document.getElementById("address")
        let city = document.getElementById("city")
        let email = document.getElementById("email")

        let teddyId = [];
        for (let i in article) {
            teddyId.push(article[i].id);
            console.log("teddies id", article[i].id)
        }

        const orderTest = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: teddyId
        }

        //verification du formulaire
        if (!firstName.value ||
        !lastName.value||
        !regexAddress.test(address.value) ||
        !regexMail.test(email.value)) {
            console.log("erreur dans le formulaire")
            formError()
        }
        else {
            console.log("on entre ici ?")
            const send = {
                method: "POST",
                body: JSON.stringify(orderTest),
                headers: {"Content-Type": "application/json"},

            };
            console.log(send)
            console.log("http://localhost:3000/api/teddies/order", send)
            sendOrder(send)
        }




    })
}

function sendOrder(send) {
    fetch("http://localhost:3000/api/teddies/order", send)
        .then(response => response.json())
        .then((number) => {
            console.log("on arrive dans sendOrder ?")
            console.log(number)
            console.log("id order", number.orderId)

            //mise dans un objet JSON le numéro de la commande et le prix total
            let infos = {
                orderId: number.orderId,
                totalPrice: totaux
            }

            let resume = [];

            resume.push(infos);
            localStorage.setItem("teddyId", JSON.stringify(resume))

            console.log(localStorage.getItem("teddyId"))

        })
        .then(() => {
        //redirection vers page de confirmation
        document.location.href = "confirm.html"
    })
        .catch((e) => {
        console.error(e)
        const err = document.createElement("div");
        const text = document.createElement("h2");
        const exp = document.createElement("p")


        let elt = document.getElementById("form");

        elt.appendChild(err);
        err.appendChild(text);
        text.appendChild(exp)

        err.classList.add("info");

        text.innerHTML = "Une erreur technique est survenue";
        exp.innerHTML = "Merci de réessayer plus tard";
    })
}

function formError() {
    const error = document.getElementById("coord")
    error.innerHTML = "Problème dans le formulaire"
    error.style.color = "red"
}

function noBasket() {

    const container = document.createElement("div")
    const empty = document.createElement("h2")
    const text = document.createElement("p")

    let elt = document.getElementById("basket")

    elt.appendChild(container)
    container.appendChild(empty)
    container.appendChild(text)

    container.classList.add("info")

    empty.innerHTML = "Votre panier est actuellement vide."
    text.innerHTML = "Pas de doute, vous craquerez sûrement pour nos magnifiques nounours"
}


//Affichage des toutes les lignes du panier
function basketLines(article) { //todo nom achanger ou voir si encore besoin
    createTotal()
    for (let i in article) {
        fetch("http://localhost:3000/api/teddies/" + article[i].id)
            .then(response => response.json())
            .then((teddy) => {
                console.log(teddy);
                console.log(article[i].id + " "+article[i].color + " " + article[i].quantity);

                createBasket(article, teddy, i);


                let prix = parseInt(teddy.price, 10);
                let quantite = parseInt(article[i].quantity, 10);
                totaux += (prix * quantite) / 100;

                console.log("dans la promise teddy", totaux);

                globalPrice.innerHTML = "Total de votre commande : <span class=\"pink bold\"> "+ totaux + " €</span>";

            })
            .catch((e) => {
                console.error(e)
                noServer()
            })
    }
    console.log("le prix à l'issue de la boucle apres el for : ", totaux);
}

if(article) {
    createTitle();
    basketLines(article)
    createForm();
    validateOrder(article)
}
else {
    noBasket()
}

