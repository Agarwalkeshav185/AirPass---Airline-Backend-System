const { response } = require('express');
const { JWT_KEY } = require('../config/serverConfig');
const UserService = require('../services/user-service');
const {StatusCodes} = require('http-status-codes');

const userService = new UserService();
const create = async (req, res) => {
    try {
        const response = await userService.create({
            email:req.body.email,
            password: req.body.password
        });
        return res.status(StatusCodes.CREATED).json({
            data : { email : response.email }, 
            success:true,
            message:'Successfully created a new user',
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data:{},
            success: false,
            message :error.message,
            err : error.explanation
        });
    }
}

const signIn  = async(req, res) =>{
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data: response,
            success:true,
            err:{},
            message:'Successfully signed in'
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data:{},
            success: false,
            message : error.message,
            err : error.explanation
        });
    }
}

const isAuthenticated = async (req, res) =>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            err:{},
            data:response,
            message:'User is authenticated and token is valid'
        });
    } catch (error) {
        return res.status(400).json({
            data:{},
            success: false,
            message:'Something went wrong',
            err: error
        })
    }
}

const isAdmin = async(req, res) =>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data : response,
            err : {},
            success: true,
            message :' Successfully fetched whether user is a admin or not'
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success:false,
            message: 'Something went wrong',
            err : error
        })
    }
}

const getDetails = async (req, res) =>{
    try {
        const response = await userService.getUser(req.params.userId);
        console.log(req.params.userId);
        return res.status(StatusCodes.OK).json({
            data : response,
            success : true,
            message : 'Fetched the details of the user',
            err : {}
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            message : 'Unable to fetch the details of the user',
            success : false,
            err : error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
    getDetails
}