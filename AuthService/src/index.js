const express = require('express');
const {PORT, Db_Sync} = require('./config/serverConfig');
const apiRoutes = require('./Routes/index');
const bodyParser = require('body-parser');
const db = require('./models/index');

// const {User} = require('./models/index');
// const UserRepository = require('./repository/user-repository');
// const UserRepository = require('./repository/user-repository');
// const userService = require('./services/user-service')

const app = express();

const prepareAndStartServer = () =>{

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async ()=>{
        console.log('Server Started at', PORT);
        if(Db_Sync){
            db.sequelize.sync({alter:true});
        }
    });
}

prepareAndStartServer();