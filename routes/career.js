const express = require("express");
const router = express.Router();
const { careerController } = require("../controllers");
const { addCategoryValidator, idValidator } = require("../validators/category");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/",
  careerController.addCareer
);


router.delete(
  "/:id",
  isAuth,
  isAdmin,

  careerController.deleteCareer
);

router.get("/", isAuth, careerController.getCareers);

router.get(
  "/:id",
  isAuth,
  isAdmin,
  careerController.getCareer
);

module.exports = router;
