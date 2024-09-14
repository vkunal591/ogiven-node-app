"use strict";

var authController = require("./auth");

var categoryController = require("./category");

var fileController = require("./file");

var postController = require("./post");

var localUploadController = require("./localUpload");

var careerController = require("./career");

var contactController = require("./contact");

var subscriberController = require("./subscriber");

var landingPageController = require("./LandingPage");

module.exports = {
  authController: authController,
  categoryController: categoryController,
  fileController: fileController,
  postController: postController,
  localUploadController: localUploadController,
  careerController: careerController,
  contactController: contactController,
  subscriberController: subscriberController,
  landingPageController: landingPageController
};