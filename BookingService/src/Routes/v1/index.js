const express = require('express');
const { BookingController } = require('../../controllers/index');
const { createChannel } = require('../../utils/messageQueue');

async function createRouter() {
    const router = express.Router();
    try {
        const channel = await createChannel();
        const bookingController = new BookingController(channel);
        router.post('/bookings', bookingController.create);
    } catch (err) {
        console.error('Error initializing booking routes:', err);
    }
    return router;
}

module.exports = createRouter();
