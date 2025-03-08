const { Router } = require("express");
const router = Router();
const captainController = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

router.post("/register", captainController.register);

router.post("/login", captainController.login);

router.get("/profile", authCaptain, captainController.profile);

router.get("/logout", authCaptain, captainController.logout);

module.exports = router;
