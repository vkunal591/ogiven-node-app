"use strict";

var authRoute = require("./auth");

var categoryRoute = require("./category");

var fileRoute = require("./file");

var postRoute = require("./post");

var localUploadRoute = require("./localUpload");

var careerRoute = require("./career");

var contactRoute = require("./contact");

var subscriberRoute = require("./subscriber");

var landingPageRoute = require("./landingPage");

module.exports = {
  authRoute: authRoute,
  categoryRoute: categoryRoute,
  fileRoute: fileRoute,
  postRoute: postRoute,
  localUploadRoute: localUploadRoute,
  careerRoute: careerRoute,
  contactRoute: contactRoute,
  subscriberRoute: subscriberRoute,
  landingPageRoute: landingPageRoute
};