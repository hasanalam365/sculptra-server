// server folder e rekhe chalan: node checkKey.js
require("dotenv").config();
const crypto = require("crypto");

const raw = process.env.GOOGLE_PRIVATE_KEY || "";
const key = raw.trim().replace(/^["']+|["']+$/g, "").replace(/\\n/g, "\n");

console.log("Raw length      :", raw.length);
console.log("Lines after fix :", key.split("\n").length);
console.log("Starts with     :", JSON.stringify(key.slice(0, 30)));
console.log("Ends with       :", JSON.stringify(key.slice(-30)));

try {
  crypto.createPrivateKey(key);
  console.log("✅ KEY OK — format thik ache");
} catch (e) {
  console.log("❌ KEY BAD:", e.message);
}