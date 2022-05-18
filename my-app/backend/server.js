const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.React_App_API_PORT;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_portal')

// make connection with database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Db Connected !!");
})

const customerRouter = require('./routes/customerRoute');
const logRouter = require('./routes/logRoute');
const sellerRouter = require('./routes/sellerRoute');
const productRouter = require('./routes/productRoute');
const authRouter = require('./auth_middleware/auth');
const loginRouter = require('./auth_middleware/login');

// routers
app.use('/customer',customerRouter);
app.use('/log',logRouter);
app.use('/seller',sellerRouter);
app.use('/auth',authRouter);
app.use('/login',loginRouter)
app.use('/product',productRouter);

// middleware for cookies
app.use(cookieParser);

// start listening on specific port
app.listen(port,() => {
    console.log(`Server is listening... port ${port}`);
})