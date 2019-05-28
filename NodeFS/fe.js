'use strict';

module.exports = function(app) {
	let fe = {};

	fe.app = app;
	
	fe.initRoutes = function() {
		console.log('FE:initRoutes');
		
		fe.app.get('/', (req, res) => {
			res.send("Hello World!");
		});
	};

	return fe;
}
