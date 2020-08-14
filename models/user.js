/* Student mongoose model */
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const options = { discriminatorKey: "kind" };

const UserSchema = new mongoose.Schema({
  password: { type: String },
  email: { type: String },
  username: { type: String },
  phone_number: { type: String },
  fav_stores: { type: Array },
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document in the database.
UserSchema.pre("save", function (next) {
  const user = this; // binds this to User document instance

  // checks to ensure we don't hash password more than once
  if (user.isModified("password")) {
    // generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this; // binds this to the User model

  // First find the user by their email
  return User.findOne({ username: username }).then((user) => {
    if (!user) return Promise.reject(); // a rejected promise
    // if the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model("Users", UserSchema);

const Employee = User.discriminator(
  "Employee",
  new mongoose.Schema(
    {
      store_id: String,
    },
    options
  )
);

const Owner = User.discriminator(
  "Owner",
  new mongoose.Schema(
    {
      store_id: String,
    },
    options
  )
);

const Admin = User.discriminator("Admin", new mongoose.Schema({}, options));

module.exports = { User, Employee, Owner, Admin };
