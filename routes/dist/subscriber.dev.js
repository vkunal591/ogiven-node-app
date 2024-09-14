"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers"),
    subscriberController = _require.subscriberController;

var isAuth = require("../middlewares/isAuth");

var isAdmin = require("../middlewares/isAdmin");

router.post("/", subscriberController.addSubscriber);
router["delete"]("/:id", isAuth, isAdmin, subscriberController.deleteSubscriber);
router.get("/", isAuth, subscriberController.getSubscribers);
router.get("/:id", isAuth, isAdmin, subscriberController.getSubscriber);
module.exports = router;