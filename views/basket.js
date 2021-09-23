console.log("Hello world");

//Rappel de nos données stockées dans le localStorage
let article = JSON.parse(localStorage.getItem("article"));

//creation des elements
function createBasket(article, i) {
    const order = document.createElement("div");


    let elt = document.getElementById("basket");
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
    name.innerHTML = article[i].name;
    color.innerHTML = article[i].color;
    quantity.innerHTML = article[i].quantity;
    price.innerHTML = article[i].price /100 + " €";
    total.innerHTML = article[i].quantity * article[i].price + " €";

}

for (let i in article) {
    createBasket(article, i);
}
