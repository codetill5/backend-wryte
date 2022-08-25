const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());
app.use(fileUpload());

app.use(morgan("tiny"));

//routes
const home = require("./routes/home");
const user = require('./routes/user')

// router middleware 
app.use("/api/v1", home);
app.use("/api/v1", user);

module.exports = app;
