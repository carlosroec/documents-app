// Set Up
var express			= require('express');
var app				= express();

var mongoose		= require('mongoose');
var morgan 			= require('morgan');
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');
var cors 			= require('cors');
var compression 	= require('compression');
var passport 		= require('passport');

var database		= require('./config/database');
var port 			= process.env.PORT || 8080;

// Controllers
var documentController = require('./app/controllers/document');
var userController = require('./app/controllers/user');
var authController = require('./app/controllers/auth');

// Configuration
mongoose.connect(database.url);

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(methodOverride());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /documents
router.route('/documents')
	.post(authController.isAuthenticated, documentController.postDocuments)
	.get(documentController.getDocuments);

// Create endpoint handlers for /documents/:document_id
router.route('/documents/:document_id')
	.get(authController.isAuthenticated, documentController.getDocument)
	.put(authController.isAuthenticated, documentController.putDocument)
	.delete(authController.isAuthenticated, documentController.deleteDocument);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Listen
app.listen(port);
console.log('App listening on port ' + port);