const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require('../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// register api
router.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("BODY => ", req.body);
  const newUser = new User({
    name,
    email,
    password
  });

  User.addUser(newUser, (err, user) => {
    err
      ? res.status(500).json({ success: false, msg: err })
      : res.json({ success: true });
  });
});

// login api
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const foundUser = await User.findOne({ email });
    console.log("Found User => ", foundUser);
    if (!foundUser) return res.send({ msg: "No User Found" });
    User.comparePassword(password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(500).json({ msg: err });
      if (!isMatch) return res.status(401).json({ msg: "User/Password Bad" });

      const token = jwt.sign({data: foundUser}, config.secret, {
        expiresIn: 600000
      });

      res.json({
        token: `Bearer ${token}`,
        user: {
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email
        }
      });
    });
  } catch (e) {
    res.json({msg: e});
  }
});

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({
    user: {
      email: req.user.email
    }
  })
})

module.exports = router;
