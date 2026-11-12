// controllers/enquiry.controller.js  (NEW file)
//
// POST /enquiry  — course enquiry form.
// Tomar existing contact.controller.js er pattern: admin email + user email + Google Sheet row.
//
// Sheet tab "Enquiries" — row 1 headers (exact text, any order):
//   Enquiry ID | Name | Email | Phone | Message | Date | Status
const transporter = require("../config/mailer");
const { insertRow } = require("../services/sheetsDb");
const { generateId } = require("../utils/generateId");
const { adminEmail, userEmail, BRAND } = require("../utils/emailTemplates");

const createEnquiry = async (req, res) => {
  try {
    const { fullName, mobile, email, message } = req.enquiry; // validateEnquiry middleware theke

    const reference = generateId().slice(0, 8).toUpperCase(); // e.g. 3F9A12BC
    const date = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });
    const record = { fullName, mobile, email, message, reference, date };

    const adminMail = transporter.sendMail({
      from: `"${BRAND} Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New course enquiry from ${fullName} (${reference})`,
      html: adminEmail(record),
    });

    const userMail = transporter.sendMail({
      from: `"${BRAND}" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: `We've received your enquiry – ${BRAND}`,
      html: userEmail(record),
    });

    const sheetAppend = insertRow("Enquiries", {
      "Enquiry ID": reference,
      Name: fullName,
      Email: email,
      Phone: mobile,
      Message: message,
      Date: date,
      Status: "Pending",
    });

    const results = await Promise.allSettled([adminMail, userMail, sheetAppend]);
    const labels = ["Admin email", "User email", "Google Sheet append"];
    results.forEach((r, i) => {
      if (r.status === "rejected")
        console.error(`❌ Enquiry ${reference}: ${labels[i]} failed:`, r.reason?.message || r.reason);
    });

    // Sheet + admin mail duitai fail hole lead hariye jabe, tai error dei.
    if (results[0].status === "rejected" && results[2].status === "rejected") {
      return res.status(500).json({
        success: false,
        message: "We couldn't submit your enquiry. Please try again.",
      });
    }

    return res.status(201).json({ success: true, reference });
  } catch (error) {
    console.error("❌ Enquiry error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

module.exports = { createEnquiry };