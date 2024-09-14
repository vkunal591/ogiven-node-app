"use strict";

var _require = require("../models"),
    Contact = _require.Contact;

var addContact = function addContact(req, res, next) {
  var _req$body, name, email, phone, subject, desc, isContactExist, newContact;

  return regeneratorRuntime.async(function addContact$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, subject = _req$body.subject, desc = _req$body.desc;
          _context.next = 4;
          return regeneratorRuntime.awrap(Contact.findOne({
            email: email
          }));

        case 4:
          isContactExist = _context.sent;

          if (!isContactExist) {
            _context.next = 8;
            break;
          }

          res.code = 400;
          throw new Error("already exist");

        case 8:
          newContact = new Contact({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            desc: desc
          });
          console.log(newContact);
          _context.next = 12;
          return regeneratorRuntime.awrap(newContact.save());

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

var deleteContact = function deleteContact(req, res, next) {
  var id, contact;
  return regeneratorRuntime.async(function deleteContact$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Contact.findById(id));

        case 4:
          contact = _context2.sent;

          if (contact) {
            _context2.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("Not found");

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Contact.findByIdAndDelete(id));

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

var getContacts = function getContacts(req, res, next) {
  var _req$query, subject, size, page, query, sizeNumber, pageNumber, search, total, pages, contact;

  return regeneratorRuntime.async(function getContacts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query = req.query, subject = _req$query.subject, size = _req$query.size, page = _req$query.page;
          query = {};
          sizeNumber = parseInt(size) || 10;
          pageNumber = parseInt(page) || 1;

          if (subject) {
            search = RegExp(subject, "i");
            query = {
              $or: [{
                subject: search
              }]
            };
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap(Contact.countDocuments(query));

        case 8:
          total = _context3.sent;
          pages = Math.ceil(total / sizeNumber);
          _context3.next = 12;
          return regeneratorRuntime.awrap(Contact.find(query).skip((pageNumber - 1) * sizeNumber).limit(sizeNumber).sort({
            _id: -1
          }));

        case 12:
          contact = _context3.sent;
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get contact list successfully",
            details: {
              contact: contact,
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

var getContact = function getContact(req, res, next) {
  var id, contact;
  return regeneratorRuntime.async(function getContact$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Contact.findById(id));

        case 4:
          contact = _context4.sent;

          if (contact) {
            _context4.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("Not found");

        case 8:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get contact successfully",
            details: {
              contact: contact
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
  addContact: addContact,
  deleteContact: deleteContact,
  getContact: getContact,
  getContacts: getContacts
};