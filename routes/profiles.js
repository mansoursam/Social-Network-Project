const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../validation/profile");
const validateWorkplaceInput = require("../validation/workplace");
const validateEducationInput = require("../validation/education");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
//get Profile Model
const Profile = require("../models/Profile");
//get User Model
const User = require("../models/User");
//get Image Model
const Image = require("../models/Image");
//cloudinary configuration

cloudinary.config({
  cloud_name: "du5powiw7",
  api_key: "728733455148494",
  api_secret: "K3CoNLQ1ltSFQoFNbpttG__vv-0"
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "fbw4_project",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const upload = multer({ storage: storage }).fields([
  { name: "profile_image" },
  { name: "background_image" }
]);

//create the profile route
router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
});
//create current Profile route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["firstName", "lastName"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no Profile";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
//create nickname route
//get profile by nickname
router.get("/nickname/:nickname", (req, res) => {
  const errors = {};
  Profile.findOne({ nickname: req.params.nickname })
    .populate("user", ["firstName", "lastName"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});
//create user_id route
//get profile by user_id
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["firstName", "lastName"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "there is no profile for this user" })
    );
});
//create route for all profiles
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["firstName", "lastName"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "there are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "there is no profiles " }));
});

//create user Profile route
router.post(
  "/",
  upload,
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    console.log(req.files);
    const { errors, isValid } = validateProfileInput(req.body);
    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.nickname) profileFields.nickname = req.body.nickname;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.street) profileFields.street = req.body.street;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.zip) profileFields.zip = req.body.zip;
    if (req.files.profile_image) profileFields.images = {};
    profileFields.images.profile_image = req.files.profile_image;
    if (req.files.background_image)
      profileFields.images.background_image = req.files.background_image;
    if (req.body.aboutme) profileFields.aboutme = req.body.aboutme;

    //skills
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //check if nickname exists
        Profile.findOne({ nickname: profileFields.nickname }).then(profile => {
          if (profile) {
            errors.nickname = "that nickname already exists";
            res.status(400).json(errors);
          }
          //save Profile
          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        });
      }
    });
  }
);
//create route for experience
//private
//
router.post(
  "/workplace",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateWorkplaceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.workplace.unshift(newExp);
      profile.save().then(profile => res.json(profile));
      console.log(profile);
    });
  }
);
//create route for experience
//private
//
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEduc = {
        school: req.body.school,
        degree: req.body.degree,
        // fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEduc);
      profile.save().then(profile => res.json(profile));
      console.log(profile);
    });
  }
);
//create route for delete experience by id
//private
//
router.delete(
  "/workplace/:work_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.workplace
          //map through experience array
          .map(item => item.id)
          .indexOf(req.params.work_id);
        //splice out of array
        profile.workplace.splice(removeIndex, 1);
        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(errors));
  }
);
//create route for delete experience by id
//private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education
          //map through experience array
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        //splice out of array
        profile.education.splice(removeIndex, 1);
        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(errors));
  }
);
//create route for delete user and profile
//private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
