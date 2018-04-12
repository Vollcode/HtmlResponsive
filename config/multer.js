const Multer = require('multer')
const storage = Multer.diskStorage({
  destination: (req, res, cb)=>{
    cb(null,"uploads/");
  },
  filename: (req, file, cb) =>{
    cb(null, file.originalname);
  }

});
const upload = Multer({storage});

module.exports = upload
