'use strict';

const fs = require('fs');

module.exports = function() {
	let crud = {};

	let readUsers = function() {
		return new Promise((resolve, reject) => {
			fs.readFile("./data/users.json", 'utf8', (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(data));
				}
			})
		})
	};

	crud.get = async function(id) {
		try {
			let allUsers = await readUsers();

			let user = {};
			for (let i = 0; i < allUsers.length; i++) {
				if (allUsers[i].id === id) {
					user = allUsers[i];
					break;
				}
			}

			return user;

		} catch (err) {
			console.log(err);

			return null;
		}
	};
	crud.getAll = async function() {
		try {
			let allUsers = await readUsers();

			return allUsers;
		} catch (err) {
			console.log(err);

			return null;
		}
	};

	return crud;
};
