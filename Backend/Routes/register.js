const express = require("express");
const router = express.Router();

//express validator
const { check, validationResult } = require("express-validator");

const SchemaUser = require("../models/SchemaUser");

////bycrypt
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const config = require("config");

//  @route        POST /api/register
//  @dec          register  user
//  @access       Public
router.post(
  "/",
  [
    check("name", "plaese add Name").not().isEmpty(),
    check("email", "Please Include a vaild Email").isEmail(),
    check("password", "enter Password with 6+ character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    //res.send(req.body);

    //destructuring
    const { name, email, password } = req.body;

    try {
      //check that given email is present is db
      let user = await SchemaUser.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "Admin Existes" });
      }

      user = new SchemaUser({
        name: name,
        email: email,
        password: password,
      });

      //bcrypt
      const slat = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, slat);

      // res.send("User Save ");

      await user.save();
      //JWT token
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

module.exports = router;
