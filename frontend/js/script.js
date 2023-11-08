// If we are in index.html
if (document.querySelector('#indexPage')) {
    const departureDate = document.querySelector('#departureDate');
    const departureCity = document.querySelector('#departureCity');
    const arrivalCity = document.querySelector('#arrivalCity');
    const searchBtn = document.querySelector('#searchBtn');
    const ticketsContainer = document.querySelector('#ticketsContainer');

    departureDate.min = new Date().toISOString().split("T")[0];


    searchBtn.addEventListener('click', () => {
        const departure = departureCity.value;
        const arrival = arrivalCity.value;
        const date = departureDate.value;


        const search = { departure, arrival, date };

        fetch('http://localhost:3000/trips', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(search)
        })
            .then(r => r.json())
            .then(trips => {
                if (trips.result) {

                    ticketsContainer.innerHTML = "";

                    for (const ticket of trips.tickets) {
                        createNewTicketItem(ticketsContainer, ticket);
                    }

                } else {
                    ticketsContainer.innerHTML = ` <div id="imgContainer">
                <img src="../img/notfound.png" alt="Not found image" />
                </div>
                <p id="desc">No trip found.</p>`
                }

            })
    })

}


// if we are in cart.html

if (document.querySelector('#cartPage')) {

    const container = document.querySelector('#container');

    fetch('http://localhost:3000/carts')
        .then(r => r.json())
        .then(carts => {

            if (carts.result) {

                container.innerHTML = ` <p>My cart</p>
            <div id="ticket-wrapper">
            </div>
            <div class="footer">
                <span id="total"></span>
                <input class="btn" type="button" value="Purchase">
            </div>`

                for (const cart of carts.carts) {

                    displayCarts(cart)

                }



            } else {
                container.classList.add('not-found');
                container.innerHTML = `<p>No tickets in your carts.</p>
                <p>Why not plan a trip?</p>`
            }

        })
}


// if we are in booking.html

if (document.querySelector('#bookingPage')) {

    const container = document.querySelector('#container');

    fetch('http://localhost:3000/bookings')
        .then(r => r.json())
        .then(bookings => {

            if (bookings.result) {

                container.innerHTML = ` <p>My cart</p>
            <div id="ticket-wrapper">
            </div>
            <div class="footer">
                <span id="total"></span>
                <input class="btn" type="button" value="Purchase">
            </div>`

            } else {
                container.classList.add('not-found');
                container.innerHTML = `<p>No booking yet.</p>
                <p>Why not plan a trip?</p>`
            }

        })
}




const createNewTicketItem = (ticketsContainer, ticket) => {

    const hour = ticket.date.split("T")[1].match(/\d{2}:\d{2}/);

    let newTicketItem = document.createElement('div');

    newTicketItem.classList.add('ticket-item');
    newTicketItem.innerHTML = `<span>${ticket.departure} > ${ticket.arrival}</span>
<span>${hour}</span>
<span>${ticket.price}€</span>`;

    ticketsContainer.append(newTicketItem);

    let newBookBtn = document.createElement('input');
    newBookBtn.setAttribute('type', 'button');
    newBookBtn.classList.add('book', 'btn')
    newBookBtn.setAttribute('value', 'book');
    newBookBtn.addEventListener('click', () => {
        const cartData = {
            departure: ticket.departure,
            arrival: ticket.arrival,
            date: ticket.date,
            price: ticket.price
        }

        fetch('http://localhost:3000/carts/new', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartData)
        })
            .then(r => r.json())
            .then(() => {
                location.assign("cart.html")
            })
    })
    newTicketItem.append(newBookBtn)
};





let total = 0;

const displayCarts = (cart) => {

    const hour = cart.date.split("T")[1].match(/\d{2}:\d{2}/);

    let newCartItem = document.createElement('div');
    newCartItem.classList.add('ticket-item');
    newCartItem.innerHTML = `<span>${cart.departure} > ${cart.arrival}</span>
<span>${hour}</span>
<span>${cart.price}€</span>`;

    total += cart.price;

    document.querySelector('#ticket-wrapper').append(newCartItem);

    let newCrossBtn = document.createElement('input');
    newCrossBtn.setAttribute('type', 'button');
    newCrossBtn.classList.add('cross', 'btn');
    newCrossBtn.setAttribute('value', 'X');

    newCrossBtn.addEventListener('click', () => {

        const departure = cart.departure;
        const arrival = cart.arrival;
        const date = cart.date;
        const price = cart.date;

        const dataToDelete = { departure, arrival, date, price };
        fetch('http://localhost:3000/trips/cancel', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToDelete)
        })
            .then(r => r.json())
            .then(() => {
                newCartItem.remove();
                console.log("ok")
            })

    })

    newCartItem.append(newCrossBtn);

    document.querySelector('#total').textContent = `Total : ${total}€`
}

