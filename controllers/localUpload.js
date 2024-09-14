const path = require("path");
const { validateExtension } = require("../validators/file");
const { LocalUpload } = require("../models");

const uploadLocalFile = async (req, res, next) => {
  try {
    const { file, body } = req;

    if (!file) {
      res.code = 400;
      throw new Error("File is not selected");
    }

    const ext = path.extname(file.originalname);
    const isValidExt = validateExtension(ext);

    if (!isValidExt) {
      res.code = 400;
      throw new Error("Only .jpg or .jpeg or .png format is allowed");
    }

    const url = `http://localhost:8000/api/v1/local/images/${req.file.filename}`;
    let newFile = null;
    if (req) {
      newFile = new LocalUpload({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        url: url
        // createdBy: req.user._id
      });

      await newFile.save();
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "File uploaded successfully",
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      destination: req.file.destination,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      url: url
    });
  } catch (error) {
    next(error);
  }
};

// API endpoint to retrieve an image by ID
const getImageByFileName = (req, res) => {
  console.log(req.params.filename);
  LocalUpload.find({ filename: req.params.filename })
    .then((image) => {
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      const filePath = path.join(__dirname, "../uploads", req.params.filename);
      res.sendFile(filePath);
    })
    .catch((err) => {
      console.error("Error retrieving image:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// API endpoint to retrieve an image by ID
const getImageByCategory = (req, res) => {
  console.log(req.params.category);
  LocalUpload.find({ fieldname: req.params.fieldname })
    .then((image) => {
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      // const filePath = path.join(__dirname, "../uploads", req.params.filename);
      res.status(200).json({
        code: 200,
        status: true,
        details: image
      });
    })
    .catch((err) => {
      console.error("Error retrieving image:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = { uploadLocalFile, getImageByFileName, getImageByCategory };
