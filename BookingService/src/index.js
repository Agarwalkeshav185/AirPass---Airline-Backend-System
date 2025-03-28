const express = require('express');
const {PORT, DB_SYNC} = require('./config/ServerConfig');
const bodyParser = require('body-parser');
const db = require('./models/index')
const apiRoutes = require('./Routes/index');

const app = express();

const setupAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/bookingservice/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`ServerStarted on Port:- ${PORT}`);
        if(DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    })
}

setupAndStartServer();