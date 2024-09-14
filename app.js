const fs = require('fs')
const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();
const connection= require("./init/mongodb");
const { authRoute, categoryRoute, fileRoute, postRoute, localUploadRoute,careerRoute,contactRoute, subscriberRoute, landingPageRoute } = require("./routes");
const { errorHandler } = require("./middlewares");
const notfound = require("./controllers/notfound");



// init app
const app = express();

// app.use(express.urlencoded({extended:false}))

// connect database   
connection();

// third-party middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'uploads')));
// route section
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/local", localUploadRoute);
app.use("/api/v1/career", careerRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/subscriber", subscriberRoute);
app.use("/api/v1/landingpage", landingPageRoute);



 


app.get("/", (req, res) => {
  res
    .status(200)
    .json({ code: 200, status: true, message: "Server is running." });
});


// not found route
app.use("*", notfound);

// error handling middleware
app.use(errorHandler);

module.exports = app;
