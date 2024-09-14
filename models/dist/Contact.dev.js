"use strict";

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
  resume: {
    type: File
  },
  role: {
    type: String
  },
  coverLatter: {
    type: String
  }
}, {
  timestamps: true
});
var User = mongoose.model("user", userSchema);
module.exports = User;