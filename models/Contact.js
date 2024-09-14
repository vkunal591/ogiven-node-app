const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    subject: { type: String },
    desc: { type: String }
  },
  { timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
