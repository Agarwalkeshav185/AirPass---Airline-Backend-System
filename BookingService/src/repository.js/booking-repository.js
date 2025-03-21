const {Booking} = require('../models/index');
const {AppError, ValidationError} = require('../utils/errors/index');
const {StatusCodes} = require('http-status-codes')

class BookingRepository {
    async create(data){
        try {
             const booking = await Booking.create(data);
             return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationErrors(error);
            }
            console.log('Something went wrong in Repository Layer.');
            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'There was some issue in creating the Booking, please try again later.',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(data){

    }
    async destroy(){

    }
    async 
}

module.exports = BookingRepository;