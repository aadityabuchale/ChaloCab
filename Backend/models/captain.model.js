const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const captainSchema = new Schema({
	fullname: {
		firstname: {
			type: String,
			required: true,
			minlength: [3, "firstname should be atleast 3 characters long"],
		},
		lastname: {
			type: String,
			required: false,
			minlength: [3, "lastname should be atleast 3 characters long"],
		},
	},

	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		match: [
			/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
			"Please enter a valid email address",
		],
	},
	password: {
		type: String,
		required: true,
		select: false,
	},

	socketId: {
		type: String,
		required: false,
	},

	status: {
		type: String,
		enum: ["active", "inactive"],
		default: "inactive",
	},

	vehicle: {
		color: {
			type: String,
			required: true,
			minlength: [3, "color should be atleast 3 characters long"],
		},

		model: {
			type: String,
			required: true,
			minlength: [3, "model should be atleast 3 characters long"],
		},

		plateNumber: {
			type: String,
			required: true,
			minlength: [3, "plate number should be atleast 3 characters long"],
		},

		capacity: {
			type: Number,
			required: true,
			minlength: [1, "capacity should be atleast 1"],
		},

		vehicleType: {
			type: String,
			required: true,
			lowercase: true,
			enum: ["car", "motorcycle", "auto"],
		},
	},

	location: {
		latitude: {
			type: Number,
			required: false,
		},

		longitude: {
			type: Number,
			required: false,
		},
	},
});

captainSchema.methods.generateJWTToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
	return token;
};

captainSchema.methods.comparePassword = async function (password) {
	const result = await bcrypt.compare(password, this.password);
	return result;
};

captainSchema.statics.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10);
};

const captainModel = model("captain", captainSchema);

module.exports = captainModel;
