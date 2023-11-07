var express = require('express');
const Carts = require('../models/carts');
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





module.exports = router;