const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const PORT = process.env.PORT;
const Auth_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL;

// Creating an express app here.
const app = express();

const limiter = rateLimit({
    window : 2*60*1000,
    max : 50,
});
// Morgan For logging the requests
app.use(morgan('combined'));

// Limiter to create a limit on the requests from one IP Address to avoid DDOS Attacks.
app.use(limiter);

app.use('/bookingservice', async (req, res, next) =>{
    try {
        const authRequestURL = `${Auth_SERVICE_URL}/authservice/api/v1/isauthenticated`;
        const response = await axios.get(authRequestURL, {
            headers:{
                'x-access-token' : req.headers['x-access-token']
            }
        });
        // console.log(response.data); // it is for debugging purpose
        if(response.data.success) next();
        else {
            return res.status(401).json({
                message: 'Unauthorised',
            });
        }
    } catch (error) {
        return res.status(401).json({
            message:'Unauthorised'
        })
    }
    
});

// Rerouting the requests to the different microservices
app.use('/bookingservice', createProxyMiddleware( {target : `${BOOKING_SERVICE_URL}/bookingservice`, changeOrigin: true }));

// Starting the requests listening to the server
app.listen(PORT , ()=>{
    console.log(`Server Started at Port:- ${PORT}`);
});