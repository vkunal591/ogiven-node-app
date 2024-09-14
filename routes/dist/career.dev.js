"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers"),
    careerController = _require.careerController;

var _require2 = require("../validators/category"),
    addCategoryValidator = _require2.addCategoryValidator,
    idValidator = _require2.idValidator;

var validate = require("../validators/validate");

var isAuth = require("../middlewares/isAuth");

var isAdmin = require("../middlewares/isAdmin");

router.post("/", careerController.addCareer);
router["delete"]("/:id", isAuth, isAdmin, careerController.deleteCareer);
router.get("/", isAuth, careerController.getCareers);
router.get("/:id", isAuth, isAdmin, careerController.getCareer);
module.exports = router;