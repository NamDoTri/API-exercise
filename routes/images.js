const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    const filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    console.log("generated file name", filename);
    cb(null, filename);
  }
});
// const storage = multer.diskStorage({
//   destination: "../assets/images"
// });
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

router.post("/images", upload.single("images"), (req, res, next) => {
  if(req.file){
    console.log("file", req.file.path);
  }else{
    console.log(req);
  }
  const filename = req.file.filename;
  //TODO
  res.status(202).json({
    filename
  });
});

module.exports = router;