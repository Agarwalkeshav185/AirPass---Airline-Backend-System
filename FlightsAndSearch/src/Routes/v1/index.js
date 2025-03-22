const express = require('express');
const {cityController, FlightController, AirportController} = require('../../controllers/index')
const {FlightMiddlewares} = require('../../middlewares/index')

const router  = express.Router();

router.post('/city', cityController.create);
router.delete('/city/:id', cityController.destroy);
router.get('/city/:id', cityController.get);
router.get('/city', cityController.getAllCities);
router.patch('/city/:id', cityController.update);


router.post('/flights',
    FlightMiddlewares.validateCreateFlight,
    FlightController.create
);
router.get('/flights', FlightController.getAll);
router.get('/flights/:id', FlightController.get);
router.patch('/flights/:id', FlightController.update);

router.post('/airports', AirportController.create);

module.exports = router;