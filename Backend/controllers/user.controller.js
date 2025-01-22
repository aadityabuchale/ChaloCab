const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const blackListTokenSchema = require("../models/blacklistToken.model");
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

	const token = user.generateJWTToken();

	res.status(201).json({ token, user });
}

async function loginUser(req, res, next) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	const user = await userModel.findOne({ email }).select("+password");

	if (!user) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	const isPasswordMatch = await user.comparePassword(password);

	if (!isPasswordMatch) {
		return res.status(401).json({ message: "Wrong password" });
	}

	const token = await user.generateJWTToken();

	res.cookie("token", token);

	return res.status(200).json({ ok: true, message: "Login Success", token });
}

async function userProfile(req, res, next) {
	const user = req.user;

	return res.status(200).json({ ok: true, message: "User Profile", user });
}

async function logoutUser(req, res, next) {
	const token = req.cookies.token || req.authorization?.split(" ")[0];

	console.log("Token from logout user", token);

	(await blackListTokenSchema.create({ token: token })).save();

	res.clearCookie("token");
	return res.status(200).json({ ok: true, message: "Logout Success" });
}

module.exports = { registerUser, loginUser, userProfile, logoutUser };
