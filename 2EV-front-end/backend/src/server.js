const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const app = express();
const mongoose = require("mongoose");

// login routes
const users = require("../routes/user");

// DB Config
const db = require("../config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

require("../config/passport")(passport);

// Middlware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get("/health", (req, res) => {
  res.status(200).json({ health: "okay" });
});

// Routes
// login routes
app.use("/user", users);

const bookings = require("../routes/booking");
app.use("/booking", bookings);

app.listen(8080, () => {
  console.log("Listening on 8080");
});
