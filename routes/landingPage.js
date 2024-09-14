const express = require("express");
const router = express.Router();
const { landingPageController } = require("../controllers");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const { validate } = require("../models/User");

router.post("/", landingPageController.addLandingPage);

router.put(
    "/:id",
    isAuth,
    isAdmin,
    validate,
    landingPageController.updateLandingPage
  );
  

router.delete(
    "/:id",
    isAuth,
    isAdmin,
    landingPageController.deleteLandingPage
  );

  
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  landingPageController.deleteLandingPage
);

router.get("/", landingPageController.getLandingPages);

router.get("/:id", isAuth, isAdmin, landingPageController.getLandingPage);

module.exports = router;
