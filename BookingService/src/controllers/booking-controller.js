const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const bookingService = new BookingService();

const create = async (req, res) =>{
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
module.exports = {
    create,

}