const {cityRepo} = require('../respository/index');

class CityService{
    constructor(){
        this.cityRepo = new cityRepo();
    }

    async createCity(data){
        try{
            const city = await this.cityRepo.createCity(data);
            return city; 
        }catch(error){
            console.log("Something went wrong at Service Layer.");
            throw {error};
        }
    }

    async deleteCity(cityID){
        try{
            await this.cityRepo.deleteCity(cityID);
            return true;
        }catch(error){
            console.log("Something went wrong at Service Layer.");
            throw {error};
        }
    }
    async updateCity(cityid, data){
        try{
            const city = await this.cityRepo.updateCity(cityid, data);
            return city;
        }catch(error){
            console.log("Something went wrong at Service Layer.");
            throw {error};
        }
    }
    async getAllCities(filter){
        try{
            const cities = await this.cityRepo.getAllCities({name : filter.name});
            return cities;
        }
        catch(error){
            throw {error};
        }
    }
    async getCity(cityid){
        try{
            const city = await this.cityRepo.getCity(cityid);
            return city;
        }catch(error){
            console.log("Something went wrong at Service Layer.");
            throw {error};
        }
    }
}

module.exports = CityService;