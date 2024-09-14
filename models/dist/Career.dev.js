"use strict";

var mongoose = require("mongoose");

var careerSchema = mongoose.Schema({
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
    type: String
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
var Career = mongoose.model("career", careerSchema);
module.exports = Career;