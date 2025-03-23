const express = require('express');
const bodyParser = require('body-parser');

const {PORT , REMINDER_BINDING_KEY} = require('./config/serverConfig');
const { createChannel, subscribeMessage } = require('./utils/messageQueue');
const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');
const jobs = require('./utils/jobs');

const setUpAndStartServer = async () =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    const channel = await createChannel();
    await subscribeMessage(channel, EmailService.SubscribeEvents , REMINDER_BINDING_KEY);

    app.post('/api/v1/tickets', TicketController.create);
    
    app.listen(PORT, ()=>{
        console.log(`Server started at Port :- ${PORT}`);  
        jobs();      
    });

}

setUpAndStartServer();