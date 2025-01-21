const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const connectToDatabse = require("./db/database");
const userRouter = require("./routes/user.route");

connectToDatabse();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.get("/", (req, res) => {
	res.send("Hello From Backend");
});

module.exports = app;
