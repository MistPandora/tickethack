var express = require('express');
const Bookings = require('../models/bookings');
var router = express.Router();


router.get('/', (req, res) => {
    Bookings.find().then(ticketsList => {
        res.json({ bookings: ticketsList })
    })
})


router.post('/new', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;
    const price = req.body.price;

    const newBookings = new Bookings({
        departure,
        arrival,
        date,
        price,
    });

    newBookings.save()

});






module.exports = router;