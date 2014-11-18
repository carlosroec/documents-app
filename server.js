//Set Up
var express			= require('express');
var app				= express();

var mongoose		= require('mongoose');
var morgan 			= require('morgan');
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');
var cors 			= require('cors');
var compression 	= require('compression');

var database		= require('./config/database');
var port 			= process.env.PORT || 8080;

//Configuration
mongoose.connect(database.url);

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(methodOverride());

//Routes
require('./app/routes.js')(app);
 
//Listen
app.listen(port);
console.log('App listening on port ' + port);