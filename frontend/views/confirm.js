console.log("Hello world")

let teddyId = JSON.parse(localStorage.getItem("teddyId"))
console.log(localStorage.getItem("teddyId"))
console.log(teddyId)
console.log(teddyId[0].orderId)
console.log(teddyId[0].totalPrice)

function createTicket() {

    const ticket = document.createElement("div")
    const title = document.createElement("h2")
    const orderNumber = document.createElement("p")
    const orderPrice = document.createElement("p")
    const thanks = document.createElement("p")

    let elt = document.getElementById("validation")

    elt.appendChild(ticket)
    ticket.appendChild(title)
    ticket.appendChild(orderNumber)
    ticket.appendChild(orderPrice)
    ticket.appendChild(thanks)

    ticket.classList.add("info")

    title.innerHTML = "Récapitulatif de votre commande"
    orderNumber.innerHTML = "Votre numéro de commande : <span>" + teddyId[0].orderId + "</span>"
    orderPrice.innerHTML = "Le prix total de votre commande : <span>" + teddyId[0].totalPrice + " €</span>"
    thanks.innerHTML = "Nous vous remercions de votre commande"

    //On nettoie le localStorage
    localStorage.removeItem("article")

}

createTicket()

