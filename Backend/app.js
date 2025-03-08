const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabse = require("./db/database");
const userRouter = require("./routes/user.route");
const captainRouter = require("./routes/captain.route");

connectToDatabse();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/captains", captainRouter);

app.get("/", (req, res) => {
	res.send("Hello From Backend");
});

module.exports = app;
