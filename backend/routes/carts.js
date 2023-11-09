var express = require('express');
const Carts = require('../models/carts');
const Booking = require('../models/bookings');
var router = express.Router();

router.get('/', (req, res) => {
    Carts.find().then(cartsList => {
        if (cartsList.length != 0) {
            res.json({ result: true, carts: cartsList })
        } else {
            res.json({ result: false })
        }
    })
})

router.post('/new', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;
    const price = req.body.price;

    const newCarts = new Carts({
        departure,
        arrival,
        date,
        price,
    });

    newCarts.save()

    res.json({ result: true, message: "New cart saved !" })

});

router.post('/cancel', (req, res) => {

    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;
    const price = req.body.price

    console.log(departure, arrival, date, price)
    Carts.deleteOne({
        departure,
        arrival,
        date,
        price
    }).then(() => {
        res.json({ result: true })
    })
})

router.get('/delete', (req, res) => {
    Carts.find().then(carts => {

        for (const cart of carts) {
            const departure = cart.departure
            const arrival = cart.arrival
            const date = cart.date
            const price = cart.price

            const newBooking = new Booking({
                departure,
                arrival,
                date,
                price
            });

            newBooking.save().then(() => {
                Carts.deleteOne({ departure, arrival, date, price }).then((element) => console.log(element + " is deleted"))
            });
        }

        res.json({ result: true })
    })

})



module.exports = router;