const express = require('express');
const API = require('./api');
const FE = require('./fe');

const app = express();
const apiHandler = API(app);
const feHandler = FE(app);
const port = 8888;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "*");
	next();
});
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "5mb"}));

app.listen(port, () => {
	console.log(`server running on port: ${port}`);

	apiHandler.initRoutes();
	feHandler.initRoutes();
});
