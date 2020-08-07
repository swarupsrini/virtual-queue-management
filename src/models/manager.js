/* Student mongoose model */
const mongoose = require('mongoose')

const Manager = mongoose.model('Manager', {
	store_id: {type: String},
	password: {type: String},
	owner: {type: Boolean}
})

module.exports = { Manager }
