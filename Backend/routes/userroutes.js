const express = require("express");
const { createUser, loginUser, currentUser } = require("../controller/userController");
const validateToken = require("../middleware/validateAccessToken");

const router = express.Router();

router.post("/register",createUser);

router.post("/login",loginUser);

router.get("/current",validateToken,currentUser);

module.exports = router;

