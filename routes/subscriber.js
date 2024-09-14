const express = require("express");
const router = express.Router();
const { subscriberController } = require("../controllers");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.post("/", subscriberController.addSubscriber);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  subscriberController.deleteSubscriber
);

router.get("/", isAuth, subscriberController.getSubscribers);

router.get("/:id", isAuth, isAdmin, subscriberController.getSubscriber);

module.exports = router;
