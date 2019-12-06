const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const passport = require("passport");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    console.log(req.body);
    const email = req.user.email;
    const { title, end, start, number, name } = req.body;
    try {
      await new Appointment({
        email,
        title,
        end,
        start,
        number,
        name
      }).save();
      return res.json({ msg: "okay" });
    } catch (e) {
      res.json({ msg: e });
    }
  }
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    console.log(req.body);
    const email = req.user.email;
    const { _id } = req.body;
    try {
      await Appointment.findByIdAndDelete(_id);
      return res.json({ msg: "okay" });
    } catch (e) {
      res.json({ msg: e });
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const appointments = await Appointment.find({ email: req.user.email });
      console.log(appointments);
      return res.json({ appointments });
    } catch (e) {
      return res.json({ msg: e });
    }
  }
);

router.get(
  "/adminFetch",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const appointments = await Appointment.find({});
      console.log(appointments);
      return res.json({ appointments });
    } catch (e) {
      return res.json({ msg: e });
    }
  }
);

router.get(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: {
        email: req.user.email
      }
    });
  }
);

module.exports = router;
