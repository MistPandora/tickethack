var express = require('express');
const Trip = require('../models/trips');
var router = express.Router();


router.post('/', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    let fullDateReceived = new Date(req.body.date).toISOString();
    // fullDateReceived.setHours(24, 59, 59);

    let fullDateNow = new Date(); // Thu Nov 08 2023 **current hour** GMT+0100 (heure normale d’Europe centrale)

    let fullDateTomorrow = new Date(); // Thu Nov 08 2023 **current hour** GMT+0100 (heure normale d’Europe centrale)
    fullDateTomorrow.setDate(fullDateNow.getDate() + 1); // Thu Nov 09 2023 **current hour** GMT+0100 (heure normale d’Europe centrale)
    fullDateTomorrow.setHours(1, 0, 0, 0); // Thu Nov 09 2023 00:00:00 GMT+0100 (heure normale d’Europe centrale)

    fullDateTomorrow = fullDateTomorrow.toISOString(); //2023-11-09T00:00:00.000Z

    fullDateNow = fullDateNow.toISOString() //2023-11-08T*current hours*Z


    // $gt : greater than the value ; $lt : less than the value

    if (fullDateReceived.split('T')[0] == fullDateNow.split('T')[0]) {

        Trip.find({ departure: { $regex: new RegExp(departure, 'i') }, arrival: { $regex: new RegExp(arrival, 'i') }, date: { $gt: fullDateNow, $lt: fullDateTomorrow } }).then(searchCities => {

            res.json({ result: true, tickets: searchCities });
        });
    } else {
        Trip.find({ departure: { $regex: new RegExp(departure, 'i') }, arrival: { $regex: new RegExp(arrival, 'i') }, date: fullDateReceived }).then(searchCities => {

            res.json({ result: true, tickets: searchCities });
        });
    }

})



module.exports = router;