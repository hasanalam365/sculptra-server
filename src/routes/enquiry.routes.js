const express = require("express");
const router = express.Router();

const { createEnquiry } = require("../controllers/enquiry.controller");
const validateEnquiry = require("../middlewares/validateEnquiry");
const enquiryRateLimiter = require("../middlewares/enquiryRateLimiter");

// POST /enquiry
router.post("/enquiry", enquiryRateLimiter, validateEnquiry, createEnquiry);

module.exports = router;