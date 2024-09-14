const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     return  cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const LocalDisckStorage= multer({ storage })
  module.exports = LocalDisckStorage
