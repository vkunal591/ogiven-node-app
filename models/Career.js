const mongoose = require("mongoose");

const careerSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    resume: { type: String },
    role: { type: String },
    coverLatter: { type: String }
  },
  { timestamps: true }
);

const Career = mongoose.model("career", careerSchema);
module.exports = Career;
