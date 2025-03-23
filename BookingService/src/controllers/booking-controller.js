const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const bookingService = new BookingService();

const { createChannel, publishMessage } = require('../utils/mesageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');
class BookingController {
    // constructor(channel){
    //     this.channel = channel;
    // }
    async sendMessageToQueue(req, res){
        try {
            const channel = await createChannel();
            const payload = { 
                data: {
                    subject : 'this is a noti from queue',
                    recepientEmail: '22136@iiitu.ac.in',
                    notificationTime: new Date(),
                    content : 'some queue will subscribe this'
                },
                service : 'CREATE_TICKET'
            };
            publishMessage(channel, REMINDER_BINDING_KEY , JSON.stringify(payload));
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

    async create(req, res){
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                data : response,
                success:true,
                message:'Successfully created the booking',
                err : {}
            });
        } catch (error) {
            console.log('Controller error');
            return res.status(error.statusCode).json({
                data:{},
                success: false,
                message:error.message,
                err : error.explanation
            });
        }
    }
}
module.exports = BookingController;