/* Student mongoose model */
const mongoose = require('mongoose')

const User = mongoose.model('User', {
	username: {type: String},
	phone_number: {type: String},
	email: {type: String},
	password: {type: String},
	queue_id: {type: String}
})

module.exports = { User }
