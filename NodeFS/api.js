'use strict';

module.exports = function(expressApp) {
	let api = {};

	api.app = expressApp;
	
	api.initRoutes = function() {
		console.log('API:initRoutes');
		
		api.app.get('/api/v1/users/:id?', function (req, res) {
			if (req.params.id === undefined) {
				//No specific 'id' specified, return all users
				res.json([
					{
						id: 0,
						name: "Test 1"
					},
					{
						id: 1,
						name: "Test 2"
					},
					{
						id: 2,
						name: "Test 3"
					}
				]);
				return;
			}
			
			let id = parseInt(req.params.id, 10);
			switch (id) {
				case 0:
					res.send({
						id: 0,
						name: "Test 1"
					});
					break;
				case 1:
					res.send({
						id: 1,
						name: "Test 2"
					});
					break;
				case 2:
					res.send({
						id: 2,
						name: "Test 3"
					});
					break;
				default:
					res.status(404).send({
						errorMessage: `User ${id} does not exist!`
					})
					break;
			}
		});
	};

	return api;
}
