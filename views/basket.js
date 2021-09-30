console.log("Hello world");

//Rappel de nos données stockées dans le localStorage
let article = JSON.parse(localStorage.getItem("article"));
let totaux = 0;
let regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexAddress = /\d([ ])(\w+[ ]?)+/;
//let totaux = 0;

//classe de test line
class line {
    constructor( id, name, color, quantity, price, imgUrl) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.quantity = quantity;
        this.price = price;
        this.imgUrl = imgUrl;

    }
}

class order {
    constructor(firstName, lastName, address, city, email, teddyId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
        this.teddyId = teddyId;
    }
}

function createTitle() {

    const title = document.createElement("h1");

    let elt = document.getElementById("basket");

    elt.appendChild(title);

    title.innerHTML = "Votre sélection";

}

//creation des elements du panier
function createBasket(article,teddy, i) {
    const orderLine = document.createElement("div");


    let elt= document.getElementById("basket");
    console.log(elt);


    elt.appendChild(orderLine);
    orderLine.classList.add("line");

    const image = document.createElement("img");
    const name = document.createElement("h2");
    const color = document.createElement("p");
    const quantity = document.createElement("p");
    const price = document.createElement("p");
    const total = document.createElement("p");

    orderLine.appendChild(image);
    orderLine.appendChild(name);
    orderLine.appendChild(color);
    orderLine.appendChild(quantity);
    orderLine.appendChild(price);
    orderLine.appendChild(total);

    //ajout des attributs particlieurs
    image.classList.add("minusImg");
    image.setAttribute( "src", teddy.imageUrl);


    //injection des elements
    name.innerHTML = "Nom : " + teddy.name;
    color.innerHTML = "couleur : " + article[i].color;
    quantity.innerHTML = "quantité : " + article[i].quantity;
    price.innerHTML = "prix : " + teddy.price + " €";
    total.innerHTML = "total : " + article[i].quantity * teddy.price + " €";

    /*test
    let som = 0;
    let prix = parseInt(teddy.price, 10);
    let quantite = parseInt(article[i].quantity, 10);

    som += prix * quantite;
    console.log("som dans createBasket", som);
    return som;
    //return totaux += article[i].quantity * teddy.price*/


}

/*function test (teddy, article, i) {

    return price += parseInt(teddy.price, 10) * parseInt(article[i].quantity, 10)
}*/


function createTotal (totaux) {
    const orderGlobalPrice = document.createElement("div")
    const globalPrice = document.createElement("p");

    let elt = document.getElementById("price");

    elt.appendChild(orderGlobalPrice);
    orderGlobalPrice.classList.add("global");
    orderGlobalPrice.appendChild(globalPrice)

    globalPrice.innerHTML = "Total de votre commande : " + totaux;

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
    lastName.setAttribute("type", "text");
    lastName.setAttribute("id", "lastName");
    lastName.setAttribute("placeholder", "Votre prénom")
    address.setAttribute("type", "text");
    address.setAttribute("id", "address");
    address.setAttribute("placeholder", "Votre adresse")
    city.setAttribute("type", "text");
    city.setAttribute("id", "city");
    city.setAttribute("placeholder", "Votre ville")
    email.setAttribute("type", "text");
    email.setAttribute("id", "email");
    email.setAttribute("placeholder", "votre adresse mail")
    send.setAttribute("id", "validate")
    send.setAttribute("type", "button");
    send.setAttribute("value", "Valider");

    //validateOrder()

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

            //createTicket(returnOrder)

            //mise dans un objet JSON le numéro de la commande et le prix total
            let infos = {
                orderId: number.orderId,
                totalPrice: totaux
            }

            let resume = [];

            resume.push(infos);
            localStorage.setItem("teddyId", JSON.stringify(resume))

            //redirection vers page de confirmation
            //document.location.href = "confirm.html"

        })
        .then(() => {
        //redirection vers page de confirmation
        document.location.href = "confirm.html"
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

    container.classList.add("empty")



    empty.innerHTML = "Votre panier est actuellement vide."
    text.innerHTML = "Pas de doute, vous craquerez sûrement pour nos magnifiques nounours"
}


//Affichage des toutes les lignes du panier
function basketLines(article) { //todo nom achanger ou voir si encore besoin
    for (let i in article) {

        fetch("http://localhost:3000/api/teddies/" + article[i].id)
        /*let prix = parseInt(test[i].price, 10);
        let quantite = parseInt(article[i].quantity, 10);
        totaux += (prix * quantite)*/
            .then(response => response.json())
            .then((teddy) => {
                console.log(teddy);
                console.log(article[i].id + " "+article[i].color + " " + article[i].quantity);

                createBasket(article, teddy, i);


                let prix = parseInt(teddy.price, 10);
                let quantite = parseInt(article[i].quantity, 10);
                totaux += (prix * quantite);


                console.log("dans la promise teddy", totaux);

                //return totaux;

                if (parseInt(i)+1 === article.length) {
                    console.log("totaux dans le if", totaux)
                    createTotal(totaux)

                }



            })

        //console.log("le prix apres le then : " + price);
    }

    console.log("le prix à l'issue de la boucle apres el for : ", totaux);
    //createTotal(totaux);


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

