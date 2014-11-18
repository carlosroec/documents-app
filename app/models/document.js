var mongoose = require('mongoose');

module.exports = mongoose.model('Document', {
	author: String,
	contents: String,
	published: Boolean
});