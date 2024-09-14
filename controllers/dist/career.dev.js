"use strict";

var _require = require("../models"),
    Career = _require.Career;

var addCareer = function addCareer(req, res, next) {
  var _req$body, name, email, phone, resume, role, coverLatter, isCareerExist, newCareer;

  return regeneratorRuntime.async(function addCareer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, resume = _req$body.resume, role = _req$body.role, coverLatter = _req$body.coverLatter;
          _context.next = 4;
          return regeneratorRuntime.awrap(Career.findOne({
            email: email
          }));

        case 4:
          isCareerExist = _context.sent;

          if (!isCareerExist) {
            _context.next = 8;
            break;
          }

          res.code = 400;
          throw new Error("already exist");

        case 8:
          newCareer = new Career({
            name: name,
            email: email,
            phone: phone,
            resume: resume,
            role: role,
            coverLatter: coverLatter
          });
          _context.next = 11;
          return regeneratorRuntime.awrap(newCareer.save());

        case 11:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Submitted successfully"
          });
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var deleteCareer = function deleteCareer(req, res, next) {
  var id, career;
  return regeneratorRuntime.async(function deleteCareer$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Career.findById(id));

        case 4:
          career = _context2.sent;

          if (career) {
            _context2.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("Not found");

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Career.findByIdAndDelete(id));

        case 10:
          res.status(200).json({
            code: 200,
            staus: true,
            message: "Deleted successfully"
          });
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var getCareers = function getCareers(req, res, next) {
  var _req$query, role, size, page, query, sizeNumber, pageNumber, search, total, pages, career;

  return regeneratorRuntime.async(function getCareers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, role = _req$query.role, size = _req$query.size, page = _req$query.page;
          query = {};
          sizeNumber = parseInt(size) || 10;
          pageNumber = parseInt(page) || 1;

          if (role) {
            search = RegExp(role, "i");
            query = {
              $or: [{
                role: search
              }]
            };
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap(Career.countDocuments(query));

        case 8:
          total = _context3.sent;
          pages = Math.ceil(total / sizeNumber);
          _context3.next = 12;
          return regeneratorRuntime.awrap(Career.find(query).skip((pageNumber - 1) * sizeNumber).limit(sizeNumber).sort({
            _id: -1
          }));

        case 12:
          career = _context3.sent;
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get career list successfully",
            details: {
              career: career,
              total: total,
              pages: pages
            }
          });
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var getCareer = function getCareer(req, res, next) {
  var id, career;
  return regeneratorRuntime.async(function getCareer$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Career.findById(id));

        case 4:
          career = _context4.sent;

          if (career) {
            _context4.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("Not found");

        case 8:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get career successfully",
            details: {
              career: career
            }
          });
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

module.exports = {
  addCareer: addCareer,
  deleteCareer: deleteCareer,
  getCareer: getCareer,
  getCareers: getCareers
};