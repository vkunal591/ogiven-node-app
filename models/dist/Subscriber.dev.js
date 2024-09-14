"use strict";

var mongoose = require("mongoose");

var subscriberSchema = mongoose.Schema({
  email: {
    type: String
  }
}, {
  timestamps: true
});
var Subscriber = mongoose.model("subscriber", subscriberSchema);
module.exports = Subscriber;