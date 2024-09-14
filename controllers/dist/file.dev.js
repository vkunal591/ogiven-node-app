"use strict";

var path = require("path");

var _require = require("../validators/file"),
    validateExtension = _require.validateExtension;

var _require2 = require("../utils/awsS3"),
    uploadFileToS3 = _require2.uploadFileToS3,
    signedUrl = _require2.signedUrl,
    deleteFileFromS3 = _require2.deleteFileFromS3;

var _require3 = require("../models"),
    File = _require3.File;

var uploadFile = function uploadFile(req, res, next) {
  var file, ext, isValidExt, key, newFile;
  return regeneratorRuntime.async(function uploadFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          file = req.file;

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
          _context.next = 12;
          return regeneratorRuntime.awrap(uploadFileToS3({
            file: file,
            ext: ext
          }));

        case 12:
          key = _context.sent;
          newFile = null;

          if (!key) {
            _context.next = 18;
            break;
          }

          newFile = new File({
            key: key,
            size: file.size,
            mimetype: file.mimetype,
            createdBy: req.user._id
          });
          _context.next = 18;
          return regeneratorRuntime.awrap(newFile.save());

        case 18:
          res.status(200).json({
            code: 200,
            status: true,
            message: "File uploaded successfully",
            data: {
              key: key,
              _id: newFile._id
            }
          });
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

var getSignedUrl = function getSignedUrl(req, res, next) {
  var key, url;
  return regeneratorRuntime.async(function getSignedUrl$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          key = req.query.key;
          _context2.next = 4;
          return regeneratorRuntime.awrap(signedUrl(key));

        case 4:
          url = _context2.sent;
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get signed url successfully",
            data: {
              url: url
            }
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var deleteFile = function deleteFile(req, res, next) {
  var key;
  return regeneratorRuntime.async(function deleteFile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          key = req.query.key;
          _context3.next = 4;
          return regeneratorRuntime.awrap(deleteFileFromS3(key));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(File.findOneAndDelete({
            key: key
          }));

        case 6:
          res.status(200).json({
            code: 200,
            status: true,
            message: "File deleted successfully"
          });
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  uploadFile: uploadFile,
  getSignedUrl: getSignedUrl,
  deleteFile: deleteFile
};