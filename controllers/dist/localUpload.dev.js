"use strict";

var path = require("path");

var _require = require("../validators/file"),
    validateExtension = _require.validateExtension;

var _require2 = require("../models"),
    LocalUpload = _require2.LocalUpload;

var uploadLocalFile = function uploadLocalFile(req, res, next) {
  var file, body, ext, isValidExt, url, newFile;
  return regeneratorRuntime.async(function uploadLocalFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          file = req.file, body = req.body;

          if (file) {
            _context.next = 5;
            break;
          }

          res.code = 400;
          throw new Error("File is not selected");

        case 5:
          ext = path.extname(file.originalname);
          isValidExt = validateExtension(ext);

          if (isValidExt) {
            _context.next = 10;
            break;
          }

          res.code = 400;
          throw new Error("Only .jpg or .jpeg or .png format is allowed");

        case 10:
          url = "http://localhost:8000/api/v1/local/images/".concat(req.file.filename);
          newFile = null;

          if (!req) {
            _context.next = 16;
            break;
          }

          newFile = new LocalUpload({
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            url: url // createdBy: req.user._id

          });
          _context.next = 16;
          return regeneratorRuntime.awrap(newFile.save());

        case 16:
          res.status(200).json({
            code: 200,
            status: true,
            message: "File uploaded successfully",
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            url: url
          });
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; // API endpoint to retrieve an image by ID


var getImageByFileName = function getImageByFileName(req, res) {
  console.log(req.params.filename);
  LocalUpload.find({
    filename: req.params.filename
  }).then(function (image) {
    if (!image) {
      return res.status(404).json({
        error: "Image not found"
      });
    }

    var filePath = path.join(__dirname, "../uploads", req.params.filename);
    res.sendFile(filePath);
  })["catch"](function (err) {
    console.error("Error retrieving image:", err);
    res.status(500).json({
      error: "Internal server error"
    });
  });
}; // API endpoint to retrieve an image by ID


var getImageByCategory = function getImageByCategory(req, res) {
  console.log(req.params.category);
  LocalUpload.find({
    fieldname: req.params.fieldname
  }).then(function (image) {
    if (!image) {
      return res.status(404).json({
        error: "Image not found"
      });
    } // const filePath = path.join(__dirname, "../uploads", req.params.filename);


    res.status(200).json({
      code: 200,
      status: true,
      details: image
    });
  })["catch"](function (err) {
    console.error("Error retrieving image:", err);
    res.status(500).json({
      error: "Internal server error"
    });
  });
};

module.exports = {
  uploadLocalFile: uploadLocalFile,
  getImageByFileName: getImageByFileName,
  getImageByCategory: getImageByCategory
};