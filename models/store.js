/* Student mongoose model */
const mongoose = require('mongoose')

const Store = mongoose.model('Store', {
	name: {type: String},
	address: {type: String},
	num_people_in_store: {type: Number},
	customer_visits: {type: Array},
	user_entry_rate: {type: Array},
	open_time: {type: Date},
	close_time: {type: Date},
	queue: {type: Array},
	verified: {type: Boolean},
	creator_id: {type: String},
	employee_ids: {type: Array}
})

module.exports = { Store }
