const validateExtension = (ext) => {
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".pdf" || ext === ".mp4") {
    return true;
  } else {
    return false;
  }
};

module.exports = { validateExtension };
