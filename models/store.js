/* Student mongoose model */
const mongoose = require("mongoose");

const Store = mongoose.model("Store", {
  name: { type: String },
  address: { type: String },
  verified: { type: Boolean },
  owner_id: { type: String },
  employee_ids: { type: Array },
  in_store: { type: Number },
});

module.exports = { Store };
