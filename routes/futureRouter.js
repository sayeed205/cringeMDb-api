const express = require("express");
const router = express.Router();
const getFuture = require("../controllers/futureController");

router.get("/", getFuture);

module.exports = router;
