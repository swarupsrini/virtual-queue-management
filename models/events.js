/* Student mongoose model */
const mongoose = require("mongoose");

const Event = mongoose.model("Event", {
  store_id: { type: String },
  user_id: { type: String },
  time: { type: Date },
});

module.exports = { Event };
