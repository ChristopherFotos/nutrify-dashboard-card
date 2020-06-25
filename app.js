const express = require("express");
const app = express();
const productRoutes = require("./api/routes/products");
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose')


// Connecting to the Mongo Atlas database                                         
mongoose.connect('mongodb+srv://**:**@node-rest-shop-7baom.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true })

mongoose.Promise = global.Promise;

app.set('view engine', 'ejs')

// Set up body parser and Morgan, other middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(express.static('public'))
app.use(express.static('public/build'))

// Handling CORS errors and OPTIONS requests
app.use(cors());

// Setting up the routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes)
app.use("/user", userRoutes)

// Setting up view routes
app.get('/login', (req, res, next) => {
      res.render('login')
    }
)

// Error handling
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
