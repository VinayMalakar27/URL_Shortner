const express = require("express");
const shortid = require("shortid");
const {handleGenarateNewShortURL, handleGetAnalytics} = require("../controllers/url")
const URL = require("../models/url");

const router = express.Router();

router.post("/", handleGenarateNewShortURL)

router.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;
