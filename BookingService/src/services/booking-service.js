const axios = require('axios');
const {BookingRepository} = require('../repository/index');
const {ServiceError} = require('../utils/errors/index');
const {FLIGHT_SERVICE_PATH} = require('../config/ServerConfig');

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError(
                    'Something went wrong in the booing process', 
                    'Insufficient Seats available in the flight.'
                );
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            // console.log(booking);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            console.log(updateFlightRequestURL);
            await axios.patch(updateFlightRequestURL, {totalSeats : flightData.totalSeats - booking.noOfSeats });
            const finalBooking = await this.bookingRepository.update(booking.id, {status:'Booked'});
            return finalBooking;
        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
                throw error;
            }
            throw new ServiceError();
        }
        
    }
}
module.exports = BookingService;