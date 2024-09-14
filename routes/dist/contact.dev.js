"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers"),
    contactController = _require.contactController;

var _require2 = require("../validators/category"),
    addCategoryValidator = _require2.addCategoryValidator,
    idValidator = _require2.idValidator;

var validate = require("../validators/validate");

var isAuth = require("../middlewares/isAuth");

var isAdmin = require("../middlewares/isAdmin");

router.post("/", contactController.addContact);
router["delete"]("/:id", isAuth, isAdmin, contactController.deleteContact);
router.get("/", isAuth, contactController.getContacts);
router.get("/:id", isAuth, isAdmin, contactController.getContact);
module.exports = router;