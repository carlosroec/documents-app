## Documents App - RestAPI

This is a test app using:

### Software
	* Node.js
	* MongoDB
	* Express

### Modules
	* Passport (Basic Auth)
	* Cors (Enable CORS)
	* Compression (GZip responses)
	* BodyParser (JSON Responses)

### Port

process.env.PORT or 8080

### Endpoints

::

	//Get all documents - HTTP Method: GET
	/api/documents

	//Create document - HTTP Method: POST (Authentication required)
	/api/documents

	//Get document by id - HTTP Method: GET (Authentication required)
	/api/documents/{document_id}

	//Update document by id - HTTP Method: PUT (Authentication required)
	/api/documents/{document_id}

	//Delete document by id - HTTP Method: DELETE (Authentication required)
	/api/documents/{document_id}

	//Create User - HTTP Method: POST
	/api/users/

	//Get User by id - HTTP Method: GET (Authentication required)
	/api/users/

### Responses

**GET**
200 (OK), list of documents.
200 (OK), single document. 
204 (No content)
404 (Not Found), if ID not found or invalid.
500 (Error)

**PUT**
200 (OK)
204 (No Content)
400 (POST Data Invalid)
401 (Unauthorized), requires username:password headers
404 (No Document Found), if ID not found or invalid.
500 (Error)

**POST**
201 (Created)
404 (Not Found)
500 (Error)

**DELETE**
200 (OK)
401 (Unauthorized), requires username:password headers
404 (Not Found), if ID not found or invalid.