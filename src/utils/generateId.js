const crypto = require("crypto");

/**
 * Unique, human-friendly enquiry ID.
 * Example: ENQ-20261112-A9F3K2
 */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion

const generateId = (prefix = "ENQ") => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const bytes = crypto.randomBytes(6);
  let code = "";
  for (let i = 0; i < 6; i++) code += ALPHABET[bytes[i] % ALPHABET.length];
  return `${prefix}-${date}-${code}`;
};

module.exports = generateId;