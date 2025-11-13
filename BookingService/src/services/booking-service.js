const axios = require('axios');
const {BookingRepository} = require('../repository/index');
const {ServiceError} = require('../utils/errors/index');
const {FLIGHT_SERVICE_PATH, USER_SERVICE_PATH, REMINDER_BINDING_KEY} = require('../config/ServerConfig');
const {publishMessage} = require('../utils/mesageQueue');

class BookingService{
    constructor(channel){
        this.bookingRepository = new BookingRepository();
        this.channel = channel;
    }
    createBooking = async(data) => {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/flightservice/api/v1/flights/${flightId}`;
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
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/flightservice/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL, {totalSeats : flightData.totalSeats - booking.noOfSeats });
            const finalBooking = await this.bookingRepository.update(booking.id, {status:'Booked'});

            const userId = data.userId;
            
            const getUserRequestURL = `${USER_SERVICE_PATH}/authservice/api/v1/user/${userId}`;
            const user = await axios.get(getUserRequestURL);
            const userData = user.data.data;
            const immediatePayload = {
                data:{
                    subject : 'Flight Booking Confirmation Mail',
                    recepientEmail: userData.email,
                    notificationTime: new Date(),
                    content : `Hello Sir/Mam, Your flight is booked with the Flight Number:- ${flightData.flightNumber}. Here, are the details of the flight given below :- No. of Seats booked:-${data.noOfSeats}`
                },
                service : 'SEND_BASIC_MAIL'
            }
            publishMessage(this.channel, REMINDER_BINDING_KEY , JSON.stringify(immediatePayload));

            return finalBooking;
        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
                throw error;
            }
            throw new ServiceError();
        }
        
    }

    getBookingById = async (bookingId) => {
        try {
            const booking = await this.bookingRepository.getById(bookingId);
            return booking;
        } catch (error) {
            throw error;
        }
    }

    listBookings = async (filters, page, limit) => {
        try {
            const result = await this.bookingRepository.list(filters, page, limit);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = BookingService;