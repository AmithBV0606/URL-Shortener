const express = require("express");
const { handleGenerateNewShortURL, redirectToOriginalURL, handleAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", redirectToOriginalURL);

router.get("/analytics/:shortId", handleAnalytics)

module.exports = router;