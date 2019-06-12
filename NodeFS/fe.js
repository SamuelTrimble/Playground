'use strict';

const express = require('express');
const path = require('path');

module.exports = function(app) {
	let fe = {};

	fe.app = app;
	
	fe.initRoutes = function() {
		console.log('FE:initRoutes');
		
		fe.app.use(express.static(path.join(__dirname, "FE/dist")));

		fe.app.get('*', (req, res) => {
			res.sendFile(__dirname, "FE/dist/index.html");
		});
	};

	return fe;
};
