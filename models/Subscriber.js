const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema(
  {
    email: { type: String }
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("subscriber", subscriberSchema);
module.exports = Subscriber;
