const express = require("express");
const router = express.Router();

//express validator
const { check, validationResult } = require("express-validator");

//Sechema
const SchemaUser = require("../models/SchemaUser");

// @route       GET api/user/:id
// @desc        get user
// @access      Public

router.get("/:id", async (req, res) => {
  try {
    const user = await SchemaUser.findById(req.params.id).select("-password");

    console.log(user);
    if (!user) {
      console.log("IF API");
      return res.send(400).json({ msg: "User Not Found " });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
