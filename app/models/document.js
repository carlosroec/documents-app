// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var DocumentSchema   = new mongoose.Schema({
	author: String,
	contents: String,
	published: Boolean,
	username: String
});

// Export the Mongoose model
module.exports = mongoose.model('Document', DocumentSchema);