"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers"),
    landingPageController = _require.landingPageController;

var isAuth = require("../middlewares/isAuth");

var isAdmin = require("../middlewares/isAdmin");

var _require2 = require("../models/User"),
    validate = _require2.validate;

router.post("/", landingPageController.addLandingPage);
router.put("/:id", isAuth, isAdmin, validate, landingPageController.updateLandingPage);
router["delete"]("/:id", isAuth, isAdmin, landingPageController.deleteLandingPage);
router["delete"]("/:id", isAuth, isAdmin, landingPageController.deleteLandingPage);
router.get("/", landingPageController.getLandingPages);
router.get("/:id", isAuth, isAdmin, landingPageController.getLandingPage);
module.exports = router;