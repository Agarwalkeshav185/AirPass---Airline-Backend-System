const {Flights} = require('../models/index.js');
const {Op} = require('sequelize');

class FlightRepository{

    #createFilter(data){
        let filter = {};
        if(data.arrivalAirportId){
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if(data.depatureAirportId){
            filter.depatureAirportId = data.depatureAirportId;
        }
        if(data.minPrice && data.maxPrice){
            Object.assign(filter, {price: {[Op.between]:[data.minPrice, data.maxPrice]}});
        }
        else if(data.minPrice){
            Object.assign(filter, {price:{[Op.gte] : data.minPrice}});
        }
        else if(data.maxPrice){
            Object.assign(filter, {price:{[Op.lte] : data.maxPrice}});
        }
        console.log(filter);
        return filter;
    }

    async createFlight(data){
        try{
            const flight = await Flights.create(data);
            return flight;
        }
        catch(error){
            console.log("Something went wrong in the flight repository layer");
            throw{error};
        }
    }

    async getFlightData(flightId){
        try{
            const flight = await Flights.findByPk(flightId);
            return flight;
        }
        catch(error){
            console.log("Something went wrong in the flight repository layer");
            throw{error};
        }
    }

    async getAllFlights(filter){
        try{
            const filterObject = this.#createFilter(filter);
            const flight = await Flights.findAll({
                    where : filterObject
                });
            return flight;
        }
        catch(error){
            console.log("Something went wrong in the flight repository layer");
            throw error;
        }
    }

    async updateFlights(flightId, data){
        try {
            await Flights.update(data,{
                where:{
                    id: flightId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in the repository layer.');
            throw error;
        }
    }
}

module.exports = FlightRepository;

/**
 * {
 *  where: {
 *           
 * }
 * }
 */