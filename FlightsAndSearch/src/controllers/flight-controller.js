const {FlightService} = require('../services/index');
const {ServerErrors, SuccessCodes} = require('../utils/error-codes');

const flightService = new FlightService();

const create = async (req, res) =>{
    try{
        const flightRequestData = {
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            arrivalairportId:req.body.arrivalairportId,
            departureairportId:req.body.departureairportId,
            arrivalTime:req.body.arrivalTime,
            departureTime:req.body.departureTime,
            price:req.body.price
        }
        const flight = await flightService.createFlight(flightRequestData);
        return res.status(SuccessCodes.CREATED).json({
            data:flight,
            success:true,
            message:'Successfully created a flight',
            err:{}
        })

    }catch(error){
        console.log(error);
        return res.status(ServerErrors.INTERNAL_SERVER_ERROR).json({
            data:{},
            success:false,
            message:'Not able to create a Flight',
            err:error
        })
    }
}

const getAll = async (req, res) =>{
    try {
        const response = await flightService.getFlightData(req.query);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success:true,
            message:'Ablt to fetch all the flights',
            err :{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to fetch the flights data',
            err : error
        })
    }
}
module.exports = {
    create,
    getAll,


}