"use strict";

var express = require("express");

var router = express.Router();

var isAuth = require("../middlewares/isAuth");

var _require = require("../controllers"),
    localUploadController = _require.localUploadController;

var LocalDisckStorage = require("../utils/diskStorage");

router.post("/upload", LocalDisckStorage.single("file"), localUploadController.uploadLocalFile);
router.get("/images/:filename", //  isAuth,
localUploadController.getImageByFileName);
router.get("/getimagesbycategory/:fieldname", //  isAuth,
localUploadController.getImageByCategory); //   router.delete("/delete-file", isAuth, fileController.deleteFile);

module.exports = router;