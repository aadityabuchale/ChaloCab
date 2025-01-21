const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

async function registerUser(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { fullname, email, password } = req.body;

	const hashedPassword = await userModel.hashPassword(password);

	const user = await userService.createUser({
		firstname: fullname.firstname,
		lastname: fullname.lastname,
		email,
		password: hashedPassword,
	});

	console.log(user);

	const token = user.generateJWTToken();

	res.status(201).json({ token, user });
}

module.exports = { registerUser };
