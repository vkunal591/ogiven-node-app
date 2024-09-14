"use strict";

var _require = require("../models"),
    User = _require.User,
    File = _require.File;

var hashPassword = require("../utils/hashPassword");

var comparePassword = require("../utils/comparePassword");

var generateToken = require("../utils/generateToken");

var generateCode = require("../utils/generateCode");

var sendEmail = require("../utils/sendEmail");

var signup = function signup(req, res, next) {
  var _req$body, name, email, password, role, isEmailExist, hashedPassword, newUser;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          isEmailExist = _context.sent;

          if (!isEmailExist) {
            _context.next = 8;
            break;
          }

          res.code = 400;
          throw new Error("Email already exist");

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(hashPassword(password));

        case 10:
          hashedPassword = _context.sent;
          newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
          });
          _context.next = 14;
          return regeneratorRuntime.awrap(newUser.save());

        case 14:
          res.status(200).json({
            code: 200,
            status: true,
            message: "User registererd successfully"
          });
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

var signin = function signin(req, res, next) {
  var _req$body2, email, password, user, match, token;

  return regeneratorRuntime.async(function signin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          res.code = 401;
          throw new Error("Invalid credentials");

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(comparePassword(password, user.password));

        case 10:
          match = _context2.sent;

          if (match) {
            _context2.next = 14;
            break;
          }

          res.code = 401;
          throw new Error("Invalid credentials");

        case 14:
          user.password = undefined;
          token = generateToken(user);
          res.status(200).json({
            code: 200,
            status: true,
            message: "User signin successful",
            details: {
              token: token,
              user: user
            }
          });
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

var verifyCode = function verifyCode(req, res, next) {
  var email, user, code;
  return regeneratorRuntime.async(function verifyCode$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          email = req.body.email;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("User not found");

        case 8:
          if (!user.isVerified) {
            _context3.next = 11;
            break;
          }

          res.code = 400;
          throw new Error("User already verified");

        case 11:
          code = generateCode(6);
          user.verificationCode = code;
          _context3.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          _context3.next = 17;
          return regeneratorRuntime.awrap(sendEmail({
            emailTo: user.email,
            subject: "Email verification code",
            code: code,
            content: "verify your account"
          }));

        case 17:
          res.status(200).json({
            code: 200,
            status: true,
            message: "User verification code sent successfully"
          });
          _context3.next = 23;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

var verifyUser = function verifyUser(req, res, next) {
  var _req$body3, email, code, user;

  return regeneratorRuntime.async(function verifyUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body3 = req.body, email = _req$body3.email, code = _req$body3.code;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("User not found");

        case 8:
          if (!(user.verificationCode !== code)) {
            _context4.next = 11;
            break;
          }

          res.code = 400;
          throw new Error("Invalid code");

        case 11:
          user.isVerified = true;
          user.verificationCode = null;
          _context4.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          res.status(200).json({
            code: 200,
            status: true,
            message: "User verified successfully"
          });
          _context4.next = 21;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var forgotPasswordCode = function forgotPasswordCode(req, res, next) {
  var email, user, code;
  return regeneratorRuntime.async(function forgotPasswordCode$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          email = req.body.email;
          _context5.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context5.sent;

          if (user) {
            _context5.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("User not found");

        case 8:
          code = generateCode(6);
          user.forgotPasswordCode = code;
          _context5.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          _context5.next = 14;
          return regeneratorRuntime.awrap(sendEmail({
            emailTo: user.email,
            subject: "Forgot password code",
            code: code,
            content: "change your password"
          }));

        case 14:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Forgot password code sent successfully"
          });
          _context5.next = 20;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

var recoverPassword = function recoverPassword(req, res, next) {
  var _req$body4, email, code, password, user, hashedPassword;

  return regeneratorRuntime.async(function recoverPassword$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body4 = req.body, email = _req$body4.email, code = _req$body4.code, password = _req$body4.password;
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context6.sent;

          if (user) {
            _context6.next = 8;
            break;
          }

          res.code = 400;
          throw new Error("User not found");

        case 8:
          if (!(user.forgotPasswordCode !== code)) {
            _context6.next = 11;
            break;
          }

          res.code = 400;
          throw new Error("Invalid code");

        case 11:
          _context6.next = 13;
          return regeneratorRuntime.awrap(hashPassword(password));

        case 13:
          hashedPassword = _context6.sent;
          user.password = hashedPassword;
          user.forgotPasswordCode = null;
          _context6.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Password recovered successfully"
          });
          _context6.next = 24;
          break;

        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 24:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

var changePassword = function changePassword(req, res, next) {
  var _req$body5, oldPassword, newPassword, _id, user, match, hashedPassword;

  return regeneratorRuntime.async(function changePassword$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body5 = req.body, oldPassword = _req$body5.oldPassword, newPassword = _req$body5.newPassword;
          _id = req.user._id;
          _context7.next = 5;
          return regeneratorRuntime.awrap(User.findById(_id));

        case 5:
          user = _context7.sent;

          if (user) {
            _context7.next = 9;
            break;
          }

          res.code = 404;
          throw new Error("User not found");

        case 9:
          _context7.next = 11;
          return regeneratorRuntime.awrap(comparePassword(oldPassword, user.password));

        case 11:
          match = _context7.sent;

          if (match) {
            _context7.next = 15;
            break;
          }

          res.code = 400;
          throw new Error("Old password doesn't match");

        case 15:
          if (!(oldPassword === newPassword)) {
            _context7.next = 18;
            break;
          }

          res.code = 400;
          throw new Error("You are providing old password");

        case 18:
          _context7.next = 20;
          return regeneratorRuntime.awrap(hashPassword(newPassword));

        case 20:
          hashedPassword = _context7.sent;
          user.password = hashedPassword;
          _context7.next = 24;
          return regeneratorRuntime.awrap(user.save());

        case 24:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Password changed successfully"
          });
          _context7.next = 30;
          break;

        case 27:
          _context7.prev = 27;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);

        case 30:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 27]]);
};

var updateProfile = function updateProfile(req, res, next) {
  var _id, _req$body6, name, email, profilePic, user, isUserExist, file;

  return regeneratorRuntime.async(function updateProfile$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _id = req.user._id;
          _req$body6 = req.body, name = _req$body6.name, email = _req$body6.email, profilePic = _req$body6.profilePic;
          _context8.next = 5;
          return regeneratorRuntime.awrap(User.findById(_id).select("-password -verificationCode -forgotPasswordCode"));

        case 5:
          user = _context8.sent;

          if (user) {
            _context8.next = 9;
            break;
          }

          res.code = 404;
          throw new Error("User not found");

        case 9:
          if (!email) {
            _context8.next = 16;
            break;
          }

          _context8.next = 12;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 12:
          isUserExist = _context8.sent;

          if (!(isUserExist && isUserExist.email === email && String(user._id) !== String(isUserExist._id))) {
            _context8.next = 16;
            break;
          }

          res.code = 400;
          throw new Error("Email already exist");

        case 16:
          if (!profilePic) {
            _context8.next = 23;
            break;
          }

          _context8.next = 19;
          return regeneratorRuntime.awrap(File.findById(profilePic));

        case 19:
          file = _context8.sent;

          if (file) {
            _context8.next = 23;
            break;
          }

          res.code = 404;
          throw new Error("File not found");

        case 23:
          user.name = name ? name : user.name;
          user.email = email ? email : user.email;
          user.profilePic = profilePic;

          if (email) {
            user.isVerified = false;
          }

          _context8.next = 29;
          return regeneratorRuntime.awrap(user.save());

        case 29:
          res.status(200).json({
            code: 200,
            status: true,
            message: "User profile updated successfully",
            details: {
              user: user
            }
          });
          _context8.next = 35;
          break;

        case 32:
          _context8.prev = 32;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);

        case 35:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 32]]);
};

var currentUser = function currentUser(req, res, next) {
  var _id, user;

  return regeneratorRuntime.async(function currentUser$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _id = req.user._id;
          _context9.next = 4;
          return regeneratorRuntime.awrap(User.findById(_id).select("-password -verificationCode -forgotPasswordCode").populate("profilePic"));

        case 4:
          user = _context9.sent;

          if (user) {
            _context9.next = 8;
            break;
          }

          res.code = 404;
          throw new Error("User not found");

        case 8:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get current user successfully",
            details: {
              user: user
            }
          });
          _context9.next = 14;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var getAllUsers = function getAllUsers(req, res, next) {
  var users;
  return regeneratorRuntime.async(function getAllUsers$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(User.find().select("-password -verificationCode -forgotPasswordCode").populate("profilePic"));

        case 3:
          users = _context10.sent;

          if (users) {
            _context10.next = 7;
            break;
          }

          res.code = 404;
          throw new Error("Users not found");

        case 7:
          res.status(200).json({
            code: 200,
            status: true,
            message: "Get All users successfully",
            details: {
              users: users
            }
          });
          _context10.next = 13;
          break;

        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  signup: signup,
  signin: signin,
  verifyCode: verifyCode,
  verifyUser: verifyUser,
  forgotPasswordCode: forgotPasswordCode,
  recoverPassword: recoverPassword,
  changePassword: changePassword,
  updateProfile: updateProfile,
  currentUser: currentUser,
  getAllUsers: getAllUsers
};