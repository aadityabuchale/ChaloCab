const userModel = require("../models/user.model");

async function createUser({ firstname, lastname, email, password }) {
	if (!firstname || !email || !password) {
		throw new Error("All fields are required");
	}

	const user = new userModel({
		fullname: {
			firstname,
			lastname,
		},
		email,
		password,
	});

	await user.save();

	return user;
}

module.exports = { createUser };
