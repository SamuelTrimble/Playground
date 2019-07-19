'use strict';

const uuidv4 = require('uuid/v4');
const multer = require('multer');
let uuidUploadStorage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./data/uploads");
	},
	filename: function(req, file, cb) {
		let pieces = file.originalname.split('.');
		let ext = pieces[pieces.length - 1];

		cb(null, uuidv4() + "." + ext);
	}
});
let imageFileFilter = (req, file, cb) => {
	let pieces = file.originalname.split('.');
	let ext = pieces[pieces.length - 1];

	switch (ext) {
		case "jpeg":
		case "jpg":
		case "png":
			cb(null, true);
			break;
		default:
			cb(null, false);
			break;
	}
};
let imageUploadHandler = multer({
	storage: uuidUploadStorage,
	fileFilter: imageFileFilter
});

module.exports = function(expressApp) {
	const users = require('./API/users')();

	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

	let api = {};

	api.app = expressApp;
	
	api.initRoutes = function() {
		console.log('API:initRoutes');
		
		api.app.get('/api/v1/users/:id', async function(req, res) {
			let id = req.params.id;

			//reject improperly formatted 'id' values
			if (!uuidRegex.test(id)) {
				res.status(500).send({
					errorMessage: "Invalid format for 'id'!"
				});
				return;
			}

			let result = await users.get(id);

			//null result was an error
			if (result === null) {
				res.status(500).send({
					errorMessage: "There was an error getting users!"
				});
				return;
			}

			//empty result was not found
			if ((!result.hasOwnProperty('id')) || (result.id === -1)) {
				res.status(404).send({
					errorMessage: `User ${id} could not be found!`
				});
				return;
			}

			res.send(result);
		});
		api.app.get('/api/v1/users/', async function(req, res) {
			let result = await users.getAll();

			//null result was an error
			if (result === null) {
				res.status(500).send({
					errorMessage: "There was an error getting users!"
				});
				return;
			}

			res.send(result);
		});
		api.app.post('/api/v1/users/:id', async function(req, res) {
			let id = req.params.id;

			if (parseInt(id, 10) === -1) {
				id = -1;
			}

			//reject improperly formatted 'id' values
			if ((id !== -1) && (!uuidRegex.test(id))) {
				res.status(500).send({
					errorMessage: "Invalid format for 'id'!"
				});
				return;
			}

			let result = await users.save(id, req.body);

			//null result was an error
			if (result === null) {
				res.status(500).send({
					errorMessage: "There was an error saving the user!"
				});
				return;
			}

			res.send({
				isSuccess: result
			});
		});
		api.app.delete('/api/v1/users/:id', async function(req, res) {
			let id = req.params.id;

			//reject improperly formatted 'id' values
			if (!uuidRegex.test(id)) {
				res.status(500).send({
					errorMessage: "Invalid format for 'id'!"
				});
				return;
			}

			let result = await users.delete(id);

			//null result was an error
			if (result === null) {
				res.status(500).send({
					errorMessage: "There was an error deleting the user!"
				});
				return;
			}

			res.send({
				isSuccess: result
			});
		});

		api.app.post('/api/v1/userimage/', imageUploadHandler.single('profileImage'), function(req, res) {
			let file = req.file;
			if (!file) {
				res.status(500).send({
					errorMessage: "There was an error uploading the specified profile image!"
				});
				return;
			}

			res.send({
				isSuccess: true,
				url: `/profileimages/${file.filename}`
			});
		});
	};

	return api;
};
