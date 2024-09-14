const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { localUploadController } = require("../controllers");
const LocalDisckStorage = require("../utils/diskStorage");

router.post(
  "/upload",
  LocalDisckStorage.single("file"),
  localUploadController.uploadLocalFile
);

router.get(
  "/images/:filename",
  //  isAuth,
  localUploadController.getImageByFileName
);

router.get(
  "/getimagesbycategory/:fieldname",
  //  isAuth,
  localUploadController.getImageByCategory
);

//   router.delete("/delete-file", isAuth, fileController.deleteFile);

module.exports = router;
