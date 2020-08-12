/* Student mongoose model */
const mongoose = require("mongoose");

const Store = mongoose.model("Store", {
  name: { type: String },
  address: { type: String },
  lat: { type: Number },
  long: { type: Number },
  verified: { type: Boolean },
  owner_id: { type: String },
  employee_ids: { type: Array },
  in_store: { type: Number },
  open_time: { type: String },
  close_time: { type: String },
});

module.exports = { Store };
