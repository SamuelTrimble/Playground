'use strict';

module.exports = function(expressApp) {
	const users = require('./API/users')();

	let api = {};

	api.app = expressApp;
	
	api.initRoutes = function() {
		console.log('API:initRoutes');
		
		api.app.get('/api/v1/users/:id', async function(req, res) {
			let id = parseInt(req.params.id, 10);

			//reject improperly formatted 'id' values
			if (isNaN(id)) {
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
	};

	return api;
};
