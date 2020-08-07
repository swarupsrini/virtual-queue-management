/* Student mongoose model */
const mongoose = require('mongoose')

const options = {discriminatorKey: 'kind'};

const GeneralUser = mongoose.model('GeneralUser', {
	password: {type: String},
})

const User = GeneralUser.discriminator('User',
  new mongoose.Schema({
	username: String,
	phone_number: String,
	email: String,
	queue_id: String
}, options));

const Manager = GeneralUser.discriminator('Manager',
  new mongoose.Schema({
	  store_id: String
}, options));

const Owner = GeneralUser.discriminator('Owner',
  new mongoose.Schema({
	  store_id: String
}, options));

const Admin = GeneralUser.discriminator('Admin',
  new mongoose.Schema({
	username: String
}, options));

module.exports = {GeneralUser, User, Manager, Owner, Admin }