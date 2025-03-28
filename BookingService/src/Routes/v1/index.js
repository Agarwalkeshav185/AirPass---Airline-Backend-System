const express = require('express');
const { BookingController } = require('../../controllers/index');
const { createChannel } = require('../../utils/mesageQueue');

const router = express.Router();

(async ()=>{
    try {
        const channel = await createChannel();
        const bookingController = new BookingController(channel);
        router.post('/bookings', bookingController.create);
        router.get('/info', (req, res)=>{
            console.log('hello');
            return res.status(200).json({
                message : 'Response from router'
            })
        })
    } catch (err) {
        console.error('Error initializing booking routes:', err);
    }
})();

module.exports = router;
