var express = require('express');
const Trip = require('../models/trips');
var router = express.Router();


router.post('/', (req, res) => {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const date = req.body.date;

    /* La date reçue vaut yyyy-mm-dd, vu que la l'heure n'est pas précisé, ça sous-entend qu'elle vaut 00:00:00
    SI la date reçue est égale à aujourd'hui, ALORS la date reçue est égale à aujourd'hui AVEC L'HEURE D'AUJOURD'HUI (et non 00:00:00)
    SINON la date reçue vaut la date ultérieure (avec l'heure à 00:00:00) */

    let dateReceived = date == new Date().setHours(1, 0, 0, 0) ? new Date() : new Date(date);


    let dateReceivedTomorrow = new Date(); // Thu Nov 08 2023 **current hour** GMT+0100 (heure normale d’Europe centrale)
    dateReceivedTomorrow.setDate(dateReceived.getDate() + 1); // Thu Nov 09 2023 **current hour** GMT+0100 (heure normale d’Europe centrale)
    dateReceivedTomorrow.setHours(1, 0, 0, 0); // Thu Nov 09 2023 00:00:00 GMT+0100 (heure normale d’Europe centrale)

    dateReceivedTomorrow = dateReceivedTomorrow.toISOString(); //2023-11-09T00:00:00.000Z

    dateReceived = dateReceived.toISOString() //2023-11-08T*hours*Z


    // $gt : greater than the value ; $lt : less than the value

    Trip.find({ departure: { $regex: new RegExp(departure, 'i') }, arrival: { $regex: new RegExp(arrival, 'i') }, date: { $gt: dateReceived, $lt: dateReceivedTomorrow } }).then(searchCities => {
        if (searchCities.length != 0) {
            res.json({ result: true, tickets: searchCities });
        } else {
            res.json({ result: false });
        }
    });

})



module.exports = router;