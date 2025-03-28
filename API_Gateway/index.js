const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const PORT = 3005;

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
        // const authRequestURL = `${}/authservice/api/v1/${}`;
        const response = await axios.get('http://localhost:3001/authservice/api/v1/isauthenticated', {
            headers:{
                'x-access-token' : req.headers['x-access-token']
            }
        });
        console.log(response.data);
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
app.use('/bookingservice', createProxyMiddleware( {target : 'http://localhost:3002/bookingservice', changeOrigin: true }));

// Starting the requests listening to the server
app.listen(PORT , ()=>{
    console.log(`Server Started at Port:- ${PORT}`);
});