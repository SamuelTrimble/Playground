const express = require('express');
const API = require('./api');
const FE = require('./fe');

const app = express();
const apiHandler = API(app);
const feHandler = FE(app);
const port = 8888;

app.listen(port, () => {
	console.log(`server running on port: ${port}`);

	apiHandler.initRoutes();
	feHandler.initRoutes();
});
