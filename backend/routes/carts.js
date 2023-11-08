var express = require('express');
const Carts = require('../models/carts');
const Booking = require('../models/bookings');
var router = express.Router();

router.get('/', (req, res) => {
    Carts.find().then(cartsList => {
        res.json({ carts: cartsList })
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

});

router.post('/cancel/', (res, req) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;
    const price = req.body.price
    Carts.deleOne({
        departure,
        arrival,
        date,
        price
    }).
        res.json({ result: true })
})

router.post('/delete', (req, res) => {
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
                price,
            });

            newBooking.save();

        }

        Carts.deleteMany().then(() => console.log("Everything is deleted"))
        res.json({ result: true })
    })

})



module.exports = router;