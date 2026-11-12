// utils/emailTemplates.js  (NEW file)
// Email design tomar existing contact/consultation email er moto same dark-teal style.

const BRAND = "Faces On Faces";

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const shell = (title, inner) => `
<div style="max-width:620px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#10151a;border:1px solid #1c2a2c;border-radius:16px;overflow:hidden;color:#ffffff;">
  <div style="padding:30px;text-align:center;background:#0e2320;">
    <h1 style="margin:0;color:#3fe6cf;font-size:26px;">${BRAND}</h1>
    <p style="margin:10px 0 0;color:#b8dcd4;font-size:14px;">${title}</p>
  </div>
  <div style="padding:30px;color:#d6e3df;line-height:1.7;font-size:15px;">${inner}</div>
  <div style="padding:18px;text-align:center;background:#08100e;color:#91b2a9;font-size:12px;">
    &copy; ${new Date().getFullYear()} ${BRAND}. All rights reserved.
  </div>
</div>`;

const line = (label, value) =>
  `<p style="margin:0 0 10px;"><strong style="color:#3fe6cf;">${label}:</strong> ${value}</p>`;

const messageBox = (message) =>
  `<div style="margin-top:20px;background:#151b1e;border-left:4px solid #3fe6cf;padding:16px;border-radius:8px;">${esc(
    message
  ).replace(/\n/g, "<br>")}</div>`;

/* ---------- Admin ---------- */
const adminEmail = (d) =>
  shell(
    "New course enquiry",
    `${line("Reference", esc(d.reference))}
     ${line("Date", esc(d.date))}
     ${line("Name", esc(d.fullName))}
     ${line("Mobile", esc(d.mobile))}
     ${line("Email", esc(d.email))}
     ${d.message ? messageBox(d.message) : line("Message", "<em>No message</em>")}
     <p style="margin-top:22px;font-size:12px;color:#91b2a9;">Hit "Reply" to respond directly to the enquirer.</p>`
  );

/* ---------- User ---------- */
const userEmail = (d) =>
  shell(
    "We've received your enquiry",
    `<h2 style="margin:0 0 12px;color:#3fe6cf;">Hi ${esc(d.fullName.split(" ")[0])},</h2>
     <p>Thank you for your interest. Our team will be in touch shortly with course details, pricing and upcoming availability.</p>
     ${line("Your reference", esc(d.reference))}
     ${line("Mobile", esc(d.mobile))}
     ${d.message ? messageBox(d.message) : ""}
     <p style="margin-top:24px;">There's no obligation to book. If you'd like to add anything, just reply to this email.</p>`
  );

module.exports = { adminEmail, userEmail, BRAND };