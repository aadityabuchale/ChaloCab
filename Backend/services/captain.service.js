const captainModel = require("../models/captain.model.js");

const createCaptain = async ({
	firstname,
	lastname,
	email,
	password,
	vehicle,
}) => {
	if (!firstname || !email || !password || !vehicle) {
		throw new Error("All fields are required");
	}

	const captain = new captainModel({
		fullname: {
			firstname,
			lastname,
		},
		email,
		password,
		vehicle,
	});

	await captain.save();

	return captain;
};

module.exports = { createCaptain };
