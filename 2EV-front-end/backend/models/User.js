const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      isRequired: true
    },
    email: {
      type: String,
      isRequired: true,
      unique: true
    },
    password: {
      type: String,
      isRequired: true
    }
  },
  { timestamps: { createdAt: "createdAt" } }
);

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.addUser = (newUser, cb) => {
  console.log("New User =>", newUser);
  bcrypt.genSalt(15, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(cb);
    });
  });
};

module.exports.comparePassword = function(requestedPass, hash, cb) {
  bcrypt.compare(requestedPass, hash, (err, isMatch) => {
    if (err) throw err;
    cb(null, isMatch);
  });
};
