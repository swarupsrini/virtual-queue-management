/* Student mongoose model */
const mongoose = require("mongoose");

const Event = mongoose.model("Event", {
  store_id: { type: String },
  user_id: { type: String },
  entry_time: { type: String }, // entry in queue
  exit_time: { type: String }, // exit from queue
});

module.exports = { Event };
