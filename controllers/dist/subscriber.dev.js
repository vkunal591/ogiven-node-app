"use strict";

var _require = require("../models"),
    Subscriber = _require.Subscriber;

var addSubscriber = function addSubscriber(req, res, next) {
  var email, isSubscriberExist, newSubscriber;
  return regeneratorRuntime.async(function addSubscriber$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(Subscriber.findOne({
            email: email
          }));

        case 4:
          isSubscriberExist = _context.sent;

          if (!isSubscriberExist) {
            _context.next = 8;
            break;
          }

          res.code = 400;
          throw new Error("already exist");

        case 8:
          newSubscriber = new Subscriber({
            email: email
          });
          console.log(newSubscriber);
          _context.next = 12;
          return regeneratorRuntime.awrap(newSubscriber.save());

        case 12:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Submitted successfully"
          });
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var deleteSubscriber = function deleteSubscriber(req, res, next) {
  var id, subscriber;
  return regeneratorRuntime.async(function deleteSubscriber$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Subscriber.findById(id));

        case 4:
          subscriber = _context2.sent;

          if (subscriber) {
            _context2.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("Not found");

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Subscriber.findByIdAndDelete(id));

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

var getSubscribers = function getSubscribers(req, res, next) {
  var _req$query, email, size, page, query, sizeNumber, pageNumber, search, total, pages, subscriber;

  return regeneratorRuntime.async(function getSubscribers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, email = _req$query.email, size = _req$query.size, page = _req$query.page;
          query = {};
          sizeNumber = parseInt(size) || 10;
          pageNumber = parseInt(page) || 1;

          if (email) {
            search = RegExp(email, "i");
            query = {
              $or: [{
                email: search
              }]
            };
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap(Subscriber.countDocuments(query));

        case 8:
          total = _context3.sent;
          pages = Math.ceil(total / sizeNumber);
          _context3.next = 12;
          return regeneratorRuntime.awrap(Subscriber.find(query).skip((pageNumber - 1) * sizeNumber).limit(sizeNumber).sort({
            _id: -1
          }));

        case 12:
          subscriber = _context3.sent;
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get subscriber list successfully",
            details: {
              subscriber: subscriber,
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

var getSubscriber = function getSubscriber(req, res, next) {
  var id, subscriber;
  return regeneratorRuntime.async(function getSubscriber$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Subscriber.findById(id));

        case 4:
          subscriber = _context4.sent;

          if (subscriber) {
            _context4.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("Not found");

        case 8:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get subscriber successfully",
            details: {
              subscriber: subscriber
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
  addSubscriber: addSubscriber,
  deleteSubscriber: deleteSubscriber,
  getSubscriber: getSubscriber,
  getSubscribers: getSubscribers
};