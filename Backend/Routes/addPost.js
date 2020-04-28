/* img is upload to file not in db*/

const express = require("express");
const router = express.Router();

const middleware = require("../Middleware/middleware");

//schema
const SchemaPost = require("../models/SchemaPost");

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

// Public Folder

//  @route        POST /api/addPost
//  @dec          adding Post
//  @access       private  (this is private route so we need a middleware that help to have header )
router.post(
  "/",
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
      const newPost = new SchemaPost({
        postName: postName,
        postDetails: postDetails,
        postAuther: postAuther,

        postImage: req.files[0].filename,
        user: req.user.id,
      });
      const contact = await newPost.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
    }
  },
);

//  @route        Get /api/Post
//  @dec          getting all post
//  @access       public
router.get("/post", async (req, res) => {
  try {
    const data = await SchemaPost.find({}).sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//  @route        Get /api/Post/:id
//  @dec          getting all post
//  @access       public
router.get("/post/:id", async (req, res) => {
  try {
    const data = await SchemaPost.findById(req.params.id);

    if (!data) {
      console.log("IF API");
      return res.send(400).json({ msg: "Post Not Found " });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @route         Get /api/Post/UserPost
// @dec           getting post by user id
// @access        private
router.get("/Userpost", middleware, async (req, res) => {
  try {
    const user = await SchemaPost.find({ user: req.user.id });
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
