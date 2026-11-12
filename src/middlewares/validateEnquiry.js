/**
 * Enquiry body validate + clean kore req.enquiry te rakhe.
 * Frontend er validation er sathe milano, kintu server e abar check kora must.
 */
const clean = (v, max) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "") // control chars
    .trim()
    .slice(0, max);

const validateEnquiry = (req, res, next) => {
  const body = req.body || {};

  const data = {
    fullName: clean(body.fullName, 100).replace(/[\r\n]+/g, " "),
    mobile: clean(body.mobile, 30).replace(/[\r\n]+/g, " "),
    email: clean(body.email, 120).toLowerCase().replace(/[\r\n]+/g, ""),
    message: clean(body.message, 500),
    consent: body.consent === true,
  };

  const errors = {};
  if (!data.fullName) errors.fullName = "Please enter your full name.";
  if (!/^[+()\d\s-]{7,}$/.test(data.mobile))
    errors.mobile = "Please enter a valid mobile number.";
  if (!/^\S+@\S+\.\S+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (!data.consent) errors.consent = "Please tick the consent box to continue.";

  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: "Validation failed.", errors });
  }

  req.enquiry = data;
  next();
};

module.exports = validateEnquiry;