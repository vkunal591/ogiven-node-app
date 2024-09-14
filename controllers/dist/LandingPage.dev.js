"use strict";

var _require = require("../models"),
    LandingPage = _require.LandingPage;

var addLandingPage = function addLandingPage(req, res, next) {
  var _req$body, homeVideo, homeTitle, homeDesc, serviceVideo, serviceDesc, productDesc, successDesc, successImage, successFinishProject, successHappyCustomer, successIssueResolved, successAwardes, expertTeamDesc, outcomeDesc, newLandingPage;

  return regeneratorRuntime.async(function addLandingPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, homeVideo = _req$body.homeVideo, homeTitle = _req$body.homeTitle, homeDesc = _req$body.homeDesc, serviceVideo = _req$body.serviceVideo, serviceDesc = _req$body.serviceDesc, productDesc = _req$body.productDesc, successDesc = _req$body.successDesc, successImage = _req$body.successImage, successFinishProject = _req$body.successFinishProject, successHappyCustomer = _req$body.successHappyCustomer, successIssueResolved = _req$body.successIssueResolved, successAwardes = _req$body.successAwardes, expertTeamDesc = _req$body.expertTeamDesc, outcomeDesc = _req$body.outcomeDesc; // const isLandingPageExist = await LandingPage.findOne({ email });
          // if (isLandingPageExist) {
          //   res.code = 400;
          //   throw new Error("already exist");
          // }

          newLandingPage = new LandingPage({
            homeVideo: homeVideo,
            homeTitle: homeTitle,
            homeDesc: homeDesc,
            serviceVideo: serviceVideo,
            serviceDesc: serviceDesc,
            productDesc: productDesc,
            successDesc: successDesc,
            successImage: successImage,
            successFinishProject: successFinishProject,
            successHappyCustomer: successHappyCustomer,
            successIssueResolved: successIssueResolved,
            successAwardes: successAwardes,
            expertTeamDesc: expertTeamDesc,
            outcomeDesc: outcomeDesc
          });
          console.log(newLandingPage);
          _context.next = 6;
          return regeneratorRuntime.awrap(newLandingPage.save());

        case 6:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Submitted successfully"
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var updateLandingPage = function updateLandingPage(req, res, next) {
  var id, _id, _req$body2, homeVideo, homeTitle, homeDesc, serviceVideo, serviceDesc, productDesc, successDesc, successImage, successFinishProject, successHappyCustomer, successIssueResolved, successAwardes, expertTeamDesc, outcomeDesc, landingPage;

  return regeneratorRuntime.async(function updateLandingPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _id = req.user._id;
          _req$body2 = req.body, homeVideo = _req$body2.homeVideo, homeTitle = _req$body2.homeTitle, homeDesc = _req$body2.homeDesc, serviceVideo = _req$body2.serviceVideo, serviceDesc = _req$body2.serviceDesc, productDesc = _req$body2.productDesc, successDesc = _req$body2.successDesc, successImage = _req$body2.successImage, successFinishProject = _req$body2.successFinishProject, successHappyCustomer = _req$body2.successHappyCustomer, successIssueResolved = _req$body2.successIssueResolved, successAwardes = _req$body2.successAwardes, expertTeamDesc = _req$body2.expertTeamDesc, outcomeDesc = _req$body2.outcomeDesc;
          _context2.next = 6;
          return regeneratorRuntime.awrap(LandingPage.findById(id));

        case 6:
          landingPage = _context2.sent;

          if (landingPage) {
            _context2.next = 10;
            break;
          }

          res.code = 404;
          throw new Error("LandingPage not found");

        case 10:
          //   const isLandingPageExist = await LandingPage.findOne({ title });
          //   if (
          //     isLandingPageExist &&
          //     isLandingPageExist.title === title &&
          //     String(isLandingPageExist._id) !== String(landingPage._id)
          //   ) {
          //     res.code = 400;
          //     throw new Error("Title alraedy exist");
          //   }
          landingPage.homeTitle = homeTitle ? homeTitle : landingPage.homeTitle;
          landingPage.homeDesc = homeDesc ? homeDesc : landingPage.homeDesc;
          landingPage.homeVideo = homeVideo ? homeVideo : landingPage.homeVideo;
          landingPage.serviceVideo = serviceVideo ? serviceVideo : landingPage.serviceVideo;
          landingPage.serviceDesc = serviceDesc ? serviceDesc : landingPage.serviceDesc;
          landingPage.productDesc = productDesc ? productDesc : landingPage.productDesc;
          landingPage.successAwardes = successAwardes ? successAwardes : landingPage.successAwardes;
          landingPage.successDesc = successDesc ? successDesc : landingPage.successFinishProject;
          landingPage.successFinishProject = successFinishProject ? successFinishProject : landingPage.successFinishProject;
          landingPage.successHappyCustomer = successHappyCustomer ? successHappyCustomer : landingPage.successHappyCustomer;
          landingPage.successImage = successImage ? successImage : landingPage.successImage;
          landingPage.successIssueResolved = successIssueResolved ? successIssueResolved : landingPage.successIssueResolved;
          landingPage.expertTeamDesc = expertTeamDesc ? expertTeamDesc : landingPage.expertTeamDesc;
          landingPage.outcomeDesc = outcomeDesc ? outcomeDesc : landingPage.outcomeDesc;
          landingPage.updatedBy = _id;
          _context2.next = 27;
          return regeneratorRuntime.awrap(landingPage.save());

        case 27:
          res.status(200).json({
            code: 200,
            status: true,
            message: "LandingPage updated successfully",
            details: {
              landingPage: landingPage
            }
          });
          _context2.next = 33;
          break;

        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 33:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 30]]);
};

var deleteLandingPage = function deleteLandingPage(req, res, next) {
  var id, landingPage;
  return regeneratorRuntime.async(function deleteLandingPage$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(LandingPage.findById(id));

        case 4:
          landingPage = _context3.sent;

          if (landingPage) {
            _context3.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("Not found");

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(LandingPage.findByIdAndDelete(id));

        case 10:
          res.status(200).json({
            code: 200,
            staus: true,
            message: "Deleted successfully"
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var getLandingPages = function getLandingPages(req, res, next) {
  var _req$query, email, size, page, query, sizeNumber, pageNumber, search, total, pages, landingPage;

  return regeneratorRuntime.async(function getLandingPages$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
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

          _context4.next = 8;
          return regeneratorRuntime.awrap(LandingPage.countDocuments(query));

        case 8:
          total = _context4.sent;
          pages = Math.ceil(total / sizeNumber);
          _context4.next = 12;
          return regeneratorRuntime.awrap(LandingPage.find(query).skip((pageNumber - 1) * sizeNumber).limit(sizeNumber).sort({
            _id: -1
          }));

        case 12:
          landingPage = _context4.sent;
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get landingPage list successfully",
            details: {
              landingPage: landingPage,
              total: total,
              pages: pages
            }
          });
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var getLandingPage = function getLandingPage(req, res, next) {
  var id, landingPage;
  return regeneratorRuntime.async(function getLandingPage$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(LandingPage.findById(id));

        case 4:
          landingPage = _context5.sent;

          if (landingPage) {
            _context5.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("Not found");

        case 8:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get landingPage successfully",
            details: {
              landingPage: landingPage
            }
          });
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

module.exports = {
  addLandingPage: addLandingPage,
  updateLandingPage: updateLandingPage,
  deleteLandingPage: deleteLandingPage,
  getLandingPage: getLandingPage,
  getLandingPages: getLandingPages
};