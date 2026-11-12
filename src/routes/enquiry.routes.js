const express = require("express");
const router = express.Router();

const { createEnquiry } = require("../controllers/enquiry.controller");
const validateEnquiry = require("../middleware/validateEnquiry");
const enquiryRateLimiter = require("../middleware/enquiryRateLimiter");

// POST /enquiry
router.post("/enquiry", enquiryRateLimiter, validateEnquiry, createEnquiry);

module.exports = router;