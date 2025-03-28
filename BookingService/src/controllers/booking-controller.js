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
}
module.exports = BookingController;