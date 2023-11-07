var express = require('express');
const Trip = require('../models/trips');
var router = express.Router();


router.post('/', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;


    Trip.find({ departure: { $regex: new RegExp(departure, 'i') }, arrival: { $regex: new RegExp(arrival, 'i') } }).then(searchCities => {
        res.json({ result: true, tickets: searchCities });
    });
})



module.exports = router;