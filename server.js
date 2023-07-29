const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors"); 

const dotenv = require("dotenv").config()

const port = process.env.PORT || 5001;

connectDb()

const app = express()
app.use(cors());
//Middleware to make use of express json module to handle JSON data transfer
app.use(express.json())
app.use(cors()) 
//Middleware to make use of API requests
app.use('/api/v1/trial', require("./routes/contactRoutes"))
app.use('/api/v1/users', require("./routes/registerRoutes"))

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Listening on port ${port}`) 
});