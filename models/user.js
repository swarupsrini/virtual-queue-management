/* Student mongoose model */
const mongoose = require("mongoose");

const options = { discriminatorKey: "kind" };

const User = mongoose.model("Users", {
  password: { type: String },
  email: { type: String },
  username: { type: String },
  phone_number: { type: String },
});

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

module.exports = { User, Employee, Owner };
