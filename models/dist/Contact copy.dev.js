"use strict";

var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
  subject: {
    type: String
  },
  desc: {
    type: String
  }
}, {
  timestamps: true
});
var Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;