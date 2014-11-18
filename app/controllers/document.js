//Load Models
var Document = require('../models/document');
	
// Create endpoint /api/documents for GET
exports.getDocuments = function(req, res) {

	// Use the Document model to find all documents
	Document.find(function(err, documents) {
		if (err) {
			res.statusCode = 500;
			return res.send(err);
		}

		if (documents.length == 0) {
			res.statusCode = 204;
			return res.send('Error 204: No content');
		}

		res.json(documents);
	});
};

// Create endpoint /api/documents for POST
exports.postDocuments = function(req, res) {

	// Create a new instance of the Document model
	var document = new Document();

	//Validate properties that came from the POST data
	if ( (!req.body.hasOwnProperty('author')) || (!req.body.hasOwnProperty('contents')) || (!req.body.hasOwnProperty('published')) || (!req.body.hasOwnProperty('username')) ) {
		res.statusCode = 400;
		return res.send('Error 400: POST data invalid');
	}

	// Set the document properties that came from the POST data
	document.author		= req.body.author;
	document.contents 	= req.body.contents;
	document.published	= req.body.published;
	document.username	= req.body.username;
	
	// Save the document and check for errors
	document.save(function(err) {
		if (err) {
			res.statusCode = 500;
			return res.send(err);
		}

		res.statusCode = 201;
		res.send('Status 201: Document created');
	});
};

// Create endpoint /api/documents/:document_id for GET
exports.getDocument = function(req, res) {

	// Use the Document model to find a specific document
	Document.findById(req.params.document_id, function(err, document) {
		if (err) {
			res.statusCode = 500;
			return res.send(err);
		}
		 
		res.statusCode = 200;
		res.json(document);
	});
};

// Create endpoint /api/documents/:document_id for PUT
exports.putDocument = function(req, res) {
	
	// Use the Document model to find a specific document
	Document.findById(req.params.document_id, function(err, document) {
		if (err) {
			res.statusCode = 500;
			return res.send(err);
		}
		
		if (!document) {
			res.statusCode = 404;
			return res.send('Error 404: No document found');
		}

		//Validate properties that came from the POST data
		if ( (!req.body.hasOwnProperty('author')) || (!req.body.hasOwnProperty('contents')) || (!req.body.hasOwnProperty('published')) || (!req.body.hasOwnProperty('username')) ) {
			res.statusCode = 400;
			return res.send('Error 400: POST data invalid');
		}

		// Update the existing document
		document.author		= req.body.author;
		document.contents 	= req.body.contents;
		document.published 	= req.body.published;
		document.username 	= req.body.username;

		// Save the beer and check for errors
		document.save(function(err) {
			if (err) {
				res.statusCode = 500;
				res.send(err);
			}
			
			res.statusCode = 200;	
			res.json(document);
		});
	});
};

// Create endpoint /api/documents/:document_id for DELETE
exports.deleteDocument = function(req, res) {
	// Use the Document model to find a specific document
	Document.findByIdAndRemove(req.params.document_id, function(err) {
		if (err) {
			res.statusCode = 500;
			return res.send(err);
		}
		
		res.statusCode = 200;	
		res.json('Status 200: Document deleted');
	});
};