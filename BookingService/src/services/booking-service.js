const axios = require('axios');
const {BookingRepository} = require('../repository.js/index');
const { ServiceError, AppError } = require('../utils/errors/index');
const {FLIGHT_SERVICE_PATH} = require('../config/ServerConfig');



class BookingService {
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/Flights/${flightId}`;
            const flight = await axios.get(getFlightRequestURL);
            return flight;
        } catch (error) {
            throw new ServiceError(
                
            );
        }
    }
}
module.exports = BookingService;