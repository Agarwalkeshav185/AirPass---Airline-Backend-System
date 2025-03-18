const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');

const ApiRoutes = require('./Routes/index');
const db = require('./models/index');

const setupAndStartServer = async()=>{
    // creating an express server
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended:true
    }));

    app.use('/api', ApiRoutes);

    app.listen(PORT, async ()=>{
        console.log(`Server started at ${PORT}`);

        if(process.env.SYNC_DB){
            db.sequelize.sync({
                alter:true
            });
        }
    });
}

setupAndStartServer();