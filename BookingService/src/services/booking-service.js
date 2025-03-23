const axios = require('axios');
const {BookingRepository} = require('../repository/index');
const {ServiceError} = require('../utils/errors/index');
const {FLIGHT_SERVICE_PATH, USER_SERVICE_PATH} = require('../config/serverConfig');

class BookingService{
    constructor(channel){
        this.bookingRepository = new BookingRepository();
        this.channel = channel;
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

            // const userId = data.userId;
            // const getUserRequestURL = `${USER_SERVICE_PATH}/api/v1//${userId}`;
            // const immediatePayload = {
            //     data:{
            //         subject : 'this is a noti from queue',
            //         recepientEmail: '22136@iiitu.ac.in',
            //         notificationTime: new Date(),
            //         content : 'some queue will subscribe this'
            //     },
            //     service : 'SEND_BASIC_MAIL'
            // }



            // try {
            //     const payload = { 
            //         data: {
            //             subject : 'this is a noti from queue',
            //             recepientEmail: '22136@iiitu.ac.in',
            //             notificationTime: new Date(),
            //             content : 'some queue will subscribe this'
            //         },
            //         service : 'CREATE_TICKET'
            //     };
            //     publishMessage(channel, REMINDER_BINDING_KEY , JSON.stringify(payload));

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