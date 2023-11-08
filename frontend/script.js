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

    const fullDateNow = new Date();
    let fullDateTomorrow = new Date();
    fullDateTomorrow.setDate(fullDateNow.getDate() + 1);
    fullDateTomorrow.setHours(1, 0, 0, 0);
    //2023-11-09T00:00:00.000Z
    console.log(fullDateTomorrow)

    const search = { departure, arrival, date };

    fetch('http://localhost:3000/trips', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(search)
    })
        .then(r => r.json())
        .then(trips => {
            console.log(trips)
        })
})






// if no trip found

// ticketsContainer.innerHTML = ` <div id="imgContainer">
// <img src="../img/train.png" alt="Train image" />
// </div>
// <p id="desc">No trip found.</p>`



// if trip found


// ticketsContainer.innerHTML = `<div class="ticket-item">
// <span>Paris > Lyon</span>
// <span>16:33</span>
// <span>136€</span>
// <input type="button" class="book btn" value="Book" />
// </div>`


