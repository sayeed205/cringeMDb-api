const express = require("express");
const router = express.Router();
const getTheater = require("../controllers/theaterController");

router.get("/", getTheater);

module.exports = router;
