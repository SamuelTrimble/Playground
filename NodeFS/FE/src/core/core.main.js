import { API_CONFIG } from './config/api.config'

export default class Core {
	constructor() {
		//eslint-disable-next-line
		if (!!Core.instance) {
			return Core.instance;
		}

		Core.instance = this;

		this.App = null;
		this.CurView = null;

		return this;
	}

	install(vue) {
		vue.prototype.$core = this;

		if (process.env.NODE_ENV !== "production") {
			window.$core = this;
		}
	}

	//Log messages to the console only in debug mode
	Log(msg) {
		if (process.env.NODE_ENV !== "production") {
			//eslint-disable-next-line
			console.log(msg);
		}
	}

	//Asynchronous Non-UI-blocking delay
	/*
	Example use:
	myElement.classList.add('fancyMovement');

	//Wait for animation to complete
	await Wait(2500);

	//Do stuff with myElement after fancy animation
	*/
	async Wait(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	//Throttles event listeners that fire rapid events like 'resize', 'mousemove', etc...
	//so they only fire a maximum of once every <delay>ms.
	/*
	Example use: (processes the 'mousemove' event a maximum of once every 200ms)
	document.addEventListener('mousemove', throttle((evt) => {
		//do stuff with evt.x & evt.y
	}, 200));
	*/
	Throttle(func, delay) {
		let prev = Date.now() - delay;
		return (...args) => {
			let cur = Date.now();
			if (cur - prev >= delay) {
				prev = cur;
				func.apply(null, args);
			}
		};
	}
	//Debounce event listeners that fire rapid events like 'resize', 'mousemove', etc...
	//so they wait until <delay>ms time has passed before processing.
	/*
	Example use: (waits until the window is done with it's 'resize' events for at least 200ms before firing)
	window.addEventListener('resize', debounce((evt) => {
		//do stuff with the new window size
	}, 200));
	*/
	Debounce(func, delay) {
		let timeout = null;
		return (...args) => {
			let later = (() => {
				timeout = null;
				func.apply(null, args);
			});
			if (timeout !== null) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(later, delay);
		};
	}

	//Embeds a 'svg' inline from an 'img' to make it available for css manipulation
	//Note: This is an 'async' call, so be sure to 'await' it if you need to do any immediate manipulation
	/*
	Example use:
	embedSVG(document.getElementById('myImgTag'));

	before: <img id='myImgTag' src='./../assets/img/myImg.svg'>
	after: <svg id='myImgTag' class='embedded-svg' ...>...</svg>
	*/
	async EmbedSVG(imgEle) {
		let id = imgEle.getAttribute('id');
		let src = imgEle.getAttribute('src');
		let classes = imgEle.getAttribute('class');

		try {
			let response = await fetch(src, {
				method: 'GET'
			});
			let result = await response.text();
			//Insert the straight 'svg' code after the passed in 'img' tag
			imgEle.insertAdjacentHTML('afterend', result);
			let newEle = imgEle.nextElementSibling;

			//Remove the old img tag
			imgEle.remove();

			//Copy old 'id' & 'class' attributes to the new 'svg' tag
			if (id !== null) {
				newEle.setAttribute('id', id);
			}
			if (classes !== null) {
				classes += " ";
			} else {
				classes = "";
			}
			classes += "embedded-svg";
			newEle.setAttribute('class', classes);
		} catch (err) {
			this.Log(err);
		}
	}

	//Calls api to retrieve list of all users
	async GetUserData() {
		try {
			let response = await fetch(`${API_CONFIG.baseUrl}/users`, {
				method: 'GET'
			});
			let result = await response.json();

			return result;
		} catch (err) {
			this.Log(err);

			return null;
		}
	}

	//Calls api to upload selected user profile image and returns the new url
	async UploadUserImage(formData) {
		try {
			let response = await fetch(`${API_CONFIG.baseUrl}/userimage`, {
				method: 'POST',
				body: formData
			});
			let result = await response.json();

			return result;
		} catch (err) {
			this.Log(err);

			return false;
		}
	}

	//Calls api to save changes to a user record
	async SaveUser(data) {
		try {
			let response = await fetch(`${API_CONFIG.baseUrl}/users/${data.id}`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			let result = await response.json();

			return result.isSuccess;
		} catch (err) {
			this.Log(err);

			return false;
		}
	}

	//Calls api to delete a user record
	async DeleteUser(id) {
		try {
			let response = await fetch(`${API_CONFIG.baseUrl}/users/${id}`, {
				method: 'DELETE'
			});
			let result = await response.json();

			return result.isSuccess;
		} catch (err) {
			this.Log(err);

			return false;
		}
	}
}
