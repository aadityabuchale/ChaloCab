const captainModel = require("../models/captain.model.js");
const captainService = require("../services/captain.service.js");
const blacklistTokenModel = require("../models/blacklistToken.model.js");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { fullname, email, password, vehicle } = req.body;

	const hashedPassword = await captainModel.hashPassword(password);

	try {
		const captain = await captainService.createCaptain({
			firstname: fullname.firstname,
			lastname: fullname.lastname,
			email,
			password: hashedPassword,
			vehicle,
		});

		const token = captain.generateJWTToken();

		res.cookie("token", token);

		res.status(201).json({ token, captain });
	} catch (e) {
		return res
			.status(400)
			.json({ message: "error saving captain results : " + e.message });
	}
};

const login = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const captain = await captainModel
			.findOne({ email })
			.select("+password");

		if (!captain) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}

		const isMatch = await captain.comparePassword(password);

		if (!isMatch) {
			return res.status(400).json({ message: "invalid password" });
		}

		const token = captain.generateJWTToken();

		res.cookie("token", token);

		res.status(200).json({ token, captain });
	} catch (e) {
		return res
			.status(400)
			.json({ message: "error logging in captain : " + e.message });
	}
};

const profile = (req, res) => {
	res.status(200).json({
		ok: true,
		message: "captain profile",
		captain: req.captain,
	});
};

const logout = async (req, res) => {
	const token = req.cookies.token || req.headers?.authorization.split(" ")[1];
	const blackListToken = new blacklistTokenModel({ token });
	await blackListToken.save();
	res.clearCookie("token");
	res.status(200).json({ message: "captain logged success" });
};

module.exports = { register, login, profile, logout };
