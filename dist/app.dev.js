"use strict";

var fs = require('fs');

var path = require('path');

var express = require("express");

var bodyParser = require("body-parser");

var dotenv = require("dotenv");

var morgan = require("morgan");

var cors = require("cors");

dotenv.config();

var connection = require("./init/mongodb");

var _require = require("./routes"),
    authRoute = _require.authRoute,
    categoryRoute = _require.categoryRoute,
    fileRoute = _require.fileRoute,
    postRoute = _require.postRoute,
    localUploadRoute = _require.localUploadRoute,
    careerRoute = _require.careerRoute,
    contactRoute = _require.contactRoute,
    subscriberRoute = _require.subscriberRoute,
    landingPageRoute = _require.landingPageRoute;

var _require2 = require("./middlewares"),
    errorHandler = _require2.errorHandler;

var notfound = require("./controllers/notfound"); // init app


var app = express(); // app.use(express.urlencoded({extended:false}))
// connect database   

connection(); // third-party middleware

app.use(cors({
  origin: "*"
}));
app.use(express.json({
  limit: "500mb"
}));
app.use(bodyParser.urlencoded({
  limit: "500mb",
  extended: true
}));
app.use(morgan("dev"));
app.use(express["static"](path.join(__dirname, 'uploads'))); // route section

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/local", localUploadRoute);
app.use("/api/v1/career", careerRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/subscriber", subscriberRoute);
app.use("/api/v1/landingpage", landingPageRoute);
app.get("/", function (req, res) {
  res.status(200).json({
    code: 200,
    status: true,
    message: "Server is running."
  });
}); // not found route

app.use("*", notfound); // error handling middleware

app.use(errorHandler);
module.exports = app;