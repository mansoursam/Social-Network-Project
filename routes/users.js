const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys").secretOrKey;
const passport = require("passport");
router.get("/", (req, res) => res.json({ msg: "it works" }));
//input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
//get User Model
const User = require("../models/User");
//create a register route with POST request
router.post("/registration", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });
      //hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
//create login router with POST request
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  //find user by email
  User.findOne({ email }).then(user => {
    //check user
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }
    //check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        };
        //sign token
        jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "password wrong" });
      }
    });
  });
});
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    });
  }
);
module.exports = router;
