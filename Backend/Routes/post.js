const express = require("express");
const ObjectID = require("mongoose").ObjectID;

const router = express.Router();

const middleware = require("../Middleware/middleware");

//schema
const SchemaPost = require("../models/SchemaPost");

// @route         delete /api/Post/:id
// @dec           getting post by user id
// @access        private
router.delete("/:id", middleware, async (req, res) => {
  try {
    await SchemaPost.findByIdAndRemove({ _id: req.params.id });
    res.send({
      message: "success",
      deletedCount: "1",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @route         put /api/Post/:id
// @dec           updating data
// @access        private

//express validator
const { check, validationResult } = require("express-validator");

var multer = require("multer"),
  bodyParser = require("body-parser"),
  path = require("path");

var fs = require("fs");
var dir = "../Frontend/myapp/public/uploads"; //store to react src becase at the time access the img it show error that b=must be in src // you can sotre any where

var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, "../Frontend/myapp/public/uploads");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname),
      );
    },
  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  },
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static("uploads"));

router.put(
  "/:id",
  [
    upload.any(),
    middleware,
    [
      check("postName", "postName is required").not().isEmpty(),
      check("postDetails", "postDetails is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    console.log("req.body"); //form fields
    console.log(req.body);
    console.log("req.file");
    console.log(req.files); //form files
    //res.send(req.files);

    // /res.send(req.files[0].filename);

    console.log("addPost");
    console.log(req.user.id);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { postName, postDetails, postAuther } = req.body;

    try {
      await SchemaPost.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.send({
        message: "success",
        Update: "1",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  },
);

module.exports = router;
