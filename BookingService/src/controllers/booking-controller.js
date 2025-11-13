const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');


const { createChannel, publishMessage } = require('../utils/mesageQueue');
const { REMINDER_BINDING_KEY } = require('../config/ServerConfig');

class BookingController {
    constructor(channel){
        this.channel = channel;
        this.bookingService = new BookingService(channel);
    }
    sendMessageToQueue = async (req, res) => {
        try {
            const payload = { 
                data: {
                    subject : 'this is a noti from queue',
                    recepientEmail: '22136@iiitu.ac.in',
                    notificationTime: new Date(),
                    content : 'some queue will subscribe this'
                },
                service : 'CREATE_TICKET'
            };
            publishMessage(this.channel, REMINDER_BINDING_KEY , JSON.stringify(payload));
            return res.status(200).json({
                message: 'Successfully published the event'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data: {},
                success : false,
                message : '',
                err : error
            });
        }
    }

    create = async (req, res) => {
        try {
            const response = await this.bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                data : response,
                success:true,
                message:'Successfully created the booking',
                err : {}
            });
        } catch (error) {
            console.log('Controller error');
            return res.status(500).json({
                data:{},
                success: false,
                message:error.message,
                err : error.explanation
            });
        }
    }

    getBooking = async (req, res) => {
        try {
            const bookingId = req.params.id;
            const response = await this.bookingService.getBookingById(bookingId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Booking fetched successfully',
                err: {}
            });
        } catch (error) {
            console.log('Controller error (getBooking)');
            const status = error.statusCode || 500;
            return res.status(status).json({
                data: {},
                success: false,
                message: error.message || 'Failed to fetch booking',
                err: error.explanation || {}
            });
        }
    }

    listBookings = async (req, res) => {
        try {
            const { userId, flightId, status, page = 1, limit = 10 } = req.query;
            const filters = {};
            if (userId) filters.userId = userId;
            if (flightId) filters.flightId = flightId;
            if (status) filters.status = status;

            const response = await this.bookingService.listBookings(filters, page, limit);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Bookings fetched successfully',
                err: {}
            });
        } catch (error) {
            console.log('Controller error (listBookings)');
            const status = error.statusCode || 500;
            return res.status(status).json({
                data: {},
                success: false,
                message: error.message || 'Failed to list bookings',
                err: error.explanation || {}
            });
        }
    }

    updateBooking = async (req, res) => {
        try {
            const bookingId = req.params.id;
            const body = req.body;
            const response = await this.bookingService.updateBooking(bookingId, body);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Booking updated successfully',
                err: {}
            });
        } catch (error) {
            console.log('Controller error (updateBooking)');
            const status = error.statusCode || 500;
            return res.status(status).json({
                data: {},
                success: false,
                message: error.message || 'Failed to update booking',
                err: error.explanation || {}
            });
        }
    }

    cancelBooking = async (req, res) => {
        try {
            const bookingId = req.params.id;
            const response = await this.bookingService.cancelBooking(bookingId);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: 'Booking cancelled successfully',
                err: {}
            });
        } catch (error) {
            console.log('Controller error (cancelBooking)');
            const status = error.statusCode || 500;
            return res.status(status).json({
                data: {},
                success: false,
                message: error.message || 'Failed to cancel booking',
                err: error.explanation || {}
            });
        }
    }
}
module.exports = BookingController;