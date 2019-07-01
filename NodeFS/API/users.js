'use strict';

const fs = require('fs');
const uuidv4 = require('uuid/v4');

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
			});
		});
	};
	let saveUsers = function(userList) {
		return new Promise((resolve, reject) => {
			fs.writeFile("./data/users.json", JSON.stringify(userList), 'utf8', (err) => {
				if (err) {
					reject(err);
				} else {
					resolve(true);
				}
			});
		});
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

	crud.save = async function(id, u) {
		try {
			let allUsers = await readUsers();
			let save = false;

			if (id === -1) {
				u.id = uuidv4();

				allUsers.push(u);
				save = true;
			} else {
				for (let i = 0; i < allUsers.length; i++) {
					if (allUsers[i].id === id) {
						allUsers[i] = u;
						save = true;
						break;
					}
				}
			}

			if (save) {
				return await saveUsers(allUsers);
			} else {
				return false;
			}
		} catch (err) {
			console.log(err);

			return null;
		}
	};

	crud.delete = async function(id) {
		try {
			let allUsers = await readUsers();
			let del = false;

			for (let i = 0; i < allUsers.length; i++) {
				if (allUsers[i].id === id) {
					allUsers.splice(i, 1);
					i--;
					del = true;
				}
			}

			if (del) {
				return await saveUsers(allUsers);
			} else {
				return false;
			}
		} catch (err) {
			console.log(err);

			return null;
		}
	};

	return crud;
};
