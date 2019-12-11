require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

const user = require('./controllers/testuser');

sequelize.sync();
app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/user', user);


app.listen(3000, function(){
    console.log('App is listening on 3000.')
})

