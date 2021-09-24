console.log("Hello world");

//Rappel de nos données stockées dans le localStorage
let article = JSON.parse(localStorage.getItem("article"));



//creation des elements du panier
function createBasket(article, teddy, i) {
    const order = document.createElement("div");

    const elt= document.getElementById("basket");
    console.log(elt);


    elt.appendChild(order);
    order.classList.add("line");

    const name = document.createElement("h2");
    const color = document.createElement("p");
    const quantity = document.createElement("p");
    const price = document.createElement("p");
    const total = document.createElement("p");

    order.appendChild(name);
    order.appendChild(color);
    order.appendChild(quantity);
    order.appendChild(price);
    order.appendChild(total);

    //injection des elements
    name.innerHTML = teddy.name;
    color.innerHTML = article[i].color;
    quantity.innerHTML = article[i].quantity;
    price.innerHTML = teddy.price + " €";
    total.innerHTML = article[i].quantity * teddy.price + " €";

}

//Affichage des toutes les lignes du panier
for (let i in article) {
    fetch("http://localhost:3000/api/teddies/" + article[i].id)
        .then(response => response.json())
        .then((teddy) => {
            console.log(teddy);
            console.log(article[i].id  + " " + article[i].price + " " + article[i].quantity);
            createBasket(article, teddy, i);
        })
}
