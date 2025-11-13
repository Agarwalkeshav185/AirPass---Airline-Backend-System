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
                throw new ValidationError(error);
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

    async update(bookingId, data){
        try {
            const booking = await Booking.findByPk(bookingId);
            if(!booking){
                throw new AppError(
                    'ResourceNotFound',
                    'Booking not found',
                    'No booking found with the provided id',
                    StatusCodes.NOT_FOUND
                );
            }

            Object.keys(data).forEach((key) => {
                if (key === 'id' || key === 'createdAt' || key === 'updatedAt' || key ==='userId' || key === 'flightId' ) return;
                if (Object.prototype.hasOwnProperty.call(booking.dataValues, key)) {
                    booking[key] = data[key];
                }
            });

            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot update the  Booking',
                'There was some issue in updating the Booking, please try again later.',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }

    }
    async destroy(){

    }

    async getById(bookingId){
        try {
            const booking = await Booking.findByPk(bookingId);
            if(!booking){
                throw new AppError(
                    'ResourceNotFound',
                    'Booking not found',
                    'No booking found with the provided id',
                    StatusCodes.NOT_FOUND
                );
            }
            return booking;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                'RepositoryError',
                'Cannot fetch the Booking',
                'There was some issue in fetching the Booking, please try again later.',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async list(filters = {}, page = 1, limit = 10){
        try {
            const where = {};
            if(filters.userId) where.userId = filters.userId;
            if(filters.flightId) where.flightId = filters.flightId;
            if(filters.status) where.status = filters.status;

            const offset = (page - 1) * limit;
            const result = await Booking.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['createdAt', 'DESC']]
            });

            return {
                items: result.rows,
                total: result.count,
                page: parseInt(page),
                limit: parseInt(limit)
            };
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot list Bookings',
                'There was some issue in listing the Bookings, please try again later.',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository;