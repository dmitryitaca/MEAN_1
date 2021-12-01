const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dbConfig = require('./configuration/dbConfig');
const account = require('./routes/account');
const passport = require('passport');
const bodyParser = require('body-parser'); // deprecated
const cors = require('cors');


const server = express();
const port = process.env.PORT || 3677;


mongoose.connect(process.env.MyConnectionString || dbConfig.dbConnection);
mongoose.connection.on('connected', ()=>{
    console.log('DB connected...');
});

mongoose.connection.on('error', (error)=>{
    console.log('DB NOT connected... Error: ' + error);
});


server.use(cors());
server.use(express.static(path.join(__dirname, 'public'))); // app.UseStaticFiles();

server.use(passport.initialize());
require('./configuration/passportConfig')(passport);

server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.get('/', function(request, response){
    response.send('Home Page...');
    //response.sendFile('index.html');
});

server.use('/account', account);
//server.use(bodyParser.json()); // deprecated
//server.use(bodyParser.urlencoded({
//    extended: true
//})); // deprecated



server.listen(port, ()=>{
    console.log('Server started...');
});