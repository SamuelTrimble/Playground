const { app, BrowserWindow } = require('electron');
const storage = require('electron-json-storage');

//Keep reference to main windows so they don't get garbage collected
let loaderWindow = null;
let mainWindow = null;

const startup = (() => {
	loaderWindow = new BrowserWindow({
		center: true,
		width: 600,
		height: 400,
		backgroundColor: "#262626",
		autoHideMenuBar: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	loaderWindow.on('closed', () => {
		loaderWindow = null;
	});

	loaderWindow.loadFile("./src/loader.html");
	//loaderWindow.webContents.openDevTools();

	let bounds = {
		x: 0,
		y: 0,
		width: 1280,
		height: 1024
	};
	storage.get('winpos', (error, data) => {
		if (error) throw error;

		if (data.hasOwnProperty("x")) {
			bounds.x = data.x;
		}
		if (data.hasOwnProperty("y")) {
			bounds.y = data.y;
		}
		if (data.hasOwnProperty("width")) {
			bounds.width = data.width;
		}
		if (data.hasOwnProperty("height")) {
			bounds.height = data.height;
		}
	});

	setTimeout(() => {
		launchApp(bounds);
	}, 5000);
});

const launchApp = ((bounds) => {
	mainWindow = new BrowserWindow({
		x: bounds.x,
		y: bounds.y,
		width: bounds.width,
		height: bounds.height,
		backgroundColor: "#262626",
		webPreferences: {
			nodeIntegration: true
		},
		show: false
	});
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		loaderWindow.close();
	});
	mainWindow.once('close', () => {
		let bounds = mainWindow.getBounds();

		storage.set('winpos', bounds, (error) => {
			if (error) throw error;
		});
	});

	mainWindow.loadFile("./src/index.html");
	mainWindow.webContents.openDevTools();
});

app.on('ready', startup);

app.on('window-all-closed', () => {
	//Don't automatically quit on MacOS when windows are closed
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	//Restart if no windows exist
	if ((loaderWindow === null) && (mainWindow === null)) {
		startup();
	}
});
