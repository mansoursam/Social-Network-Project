const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//Post Model
const Post = require("../models/Posts");

//create A Post Route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validatePostInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,

      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);
module.exports = router;
