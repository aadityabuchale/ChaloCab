const mongoose = require("mongoose");

const connectToDatabse = () => {
	mongoose
		.connect(process.env.DB_CONNECT)
		.then(() => console.log("Databse Connection established"))
		.catch((err) => console.log("Error connecting in Database ", err));
};

module.exports = connectToDatabse;
