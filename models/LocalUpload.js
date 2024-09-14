const mongoose = require("mongoose");

const localUploadSchema = mongoose.Schema(
  {
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: String,
    url: String,
    category:String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" }
  },
  { timestamps: true }
);

const LocalUpload = mongoose.model("localUpload", localUploadSchema);
module.exports = LocalUpload;
