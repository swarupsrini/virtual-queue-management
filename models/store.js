/* Student mongoose model */
const mongoose = require("mongoose");

const Store = mongoose.model("Store", {
  name: { type: String },
  address: { type: String },
  open_time: { type: Date },
  verified: { type: Boolean },
  owner_id: { type: String },
  employee_ids: { type: Array },
});

module.exports = { Store };
