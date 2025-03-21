const { CityService } = require('../services/index.js');

/**
 * POST
 * data -> req.body 
 * 
 */


const cityService = new CityService();

const create = async (req, res) =>{
    try{
        const city = await cityService.createCity(req.body);
        return res.status(200).json({
            data : city,
            success:true,
            message : "Successfully created a city",
            err : {}
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success : false,
            message :'Not able to create a city',
            err : error
        });
    }
}


// DELETE --> city/:id
const destroy = async (req, res) =>{
    try{
        await cityService.deleteCity(req.params.id);
        return res.status(200).json({
            success :true,
            message : 'Successfully City Deleted',
            err : {}
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success : false,
            message :'Not able to delete a city',
            err : error
        });
    }
}

// PATCH --> /city/:id  -->req.body
const update = async (req, res) =>{
    try{
        const city = await cityService.updateCity(req.params.id, req.body);
        return res.status(200).json({
            data :city,
            success :true,
            message :'Successfully updated the city',
            err :{}
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success : false,
            message :'Not able to update a city',
            err : error
        });
    }
}


const getAllCities = async (req,res) =>{
    try{
        
        const cities = await cityService.getAllCities(req.query);
        return res.status(200).json({
            data: cities,
            success :true,
            message: "Successfully fetched cities.",
            err :{}
        });
    }
    catch(error){
        return res.status(500).json({
            data: {},
            success : false,
            message :'Not able to fetch a single city',
            err : error
        });
    }
}

// GET --> /city/:id
const get = async (req, res) =>{
    try{
        const city = await cityService.getCity(req.params.id);
        return res.status(200).json({
            data: city,
            success :true,
            message: "Successfully fetched city.",
            err :{}
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success : false,
            message :'Not able to fetch a city',
            err : error
        });
    }
}


module.exports = {
    create,
    destroy,
    update,
    get,
    getAllCities
};