const express = require("express");
const router = express.Router();

//express validator
const { check, validationResult } = require("express-validator");

//Sechema
const SchemaUser = require("../models/SchemaUser");

////bycrypt
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const config = require("config");

//middleWare
const middleware = require("../Middleware/middleware");

//  @route        POST /api/login
//  @dec          login  user and Admin
//  @access       Public

router.post(
  "/",
  [
    check("email", "Please Include Valid Email").isEmail(),

    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await SchemaUser.findOne({ email });

      //checking email
      if (!user) {
        return res.send(400).json({ msg: "Invalid Credentails email " });
      }

      //checking password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.send(400).json({ msg: "Invalid Credentails email " });
      }

      const PAYLOAD = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        PAYLOAD,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server Error");
    }
  },
);

// @route       GET api/auth
// @desc        get logged in user
// @access      Private

router.get("/", middleware, async (req, res) => {
  try {
    const user = await SchemaUser.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
