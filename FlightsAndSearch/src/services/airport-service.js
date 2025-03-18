const crudService = require('./crud-service');
const {airportRepo} = require('../respository/index')

class AirportService extends crudService{
    constructor(){
        const airportRepository = new airportRepo();
        super(airportRepository);
    }
}

module.exports = AirportService;