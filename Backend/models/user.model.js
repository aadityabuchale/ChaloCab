const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
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
			minlength: [5, "email should be atleast 5 characters long"],
		},
		password: {
			type: String,
			required: true,
			select: false,
			minlength: [6, "email should be atleast 6 characters long"],
		},

		socketId: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

userSchema.methods.generateJWTToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
	return token;
};

userSchema.methods.comparePassword = async function (password) {
	const result = await bcrypt.compare(password, this.password);
	return result;
};

userSchema.statics.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
