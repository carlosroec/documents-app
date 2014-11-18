// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if (err) {
			res.statusCode = 500;
			return res.send(err);
		}

		res.statusCode = 201;
		res.json('Status 201: User created');
	});
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if (err) {
			res.statusCode = 500;
			return res.send(err);
		}

		if (users.lentgth == 0) {
			res.statusCode = 204;

			return res.send('Error 204: No content');
		}

		res.json(users);
	});
};