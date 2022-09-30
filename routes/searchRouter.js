const express = require("express");
const router = express.Router();
const getMovie = require("../controllers/searchController");

router.get("/:movie/:year", getMovie);

module.exports = router;
