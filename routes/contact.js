const express = require("express");
const router = express.Router();
const { contactController } = require("../controllers");
const { addCategoryValidator, idValidator } = require("../validators/category");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/",
  contactController.addContact
);


router.delete(
  "/:id",
  isAuth,
  isAdmin,

  contactController.deleteContact
);

router.get("/", isAuth, contactController.getContacts);

router.get(
  "/:id",
  isAuth,
  isAdmin,
  contactController.getContact
);

module.exports = router;
