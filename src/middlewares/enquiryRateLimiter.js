const rateLimit = require("express-rate-limit");

// Ek IP theke 15 minute e max 5 ta enquiry (spam theke bachte)
const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again in a few minutes.",
  },
});

module.exports = enquiryRateLimiter;