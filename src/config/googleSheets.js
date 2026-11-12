const { google } = require("googleapis");

let sheetsClient = null;

const getSheets = () => {
  if (sheetsClient) return sheetsClient;

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    // .env te private key er new line gulo "\n" hishebe thake, ekhane asol new line e convert hoy
    key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsClient = google.sheets({ version: "v4", auth });
  return sheetsClient;
};

/**
 * Sheet er sheshe ekta notun row add kore.
 * RAW mode: value gulo text hishebe save hoy (=, +, - diye shuru hole formula hobe na).
 */
const appendRow = async (row) => {
  const tab = process.env.GOOGLE_SHEET_TAB || "Enquiries";

  return getSheets().spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${tab}!A:H`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
};

module.exports = { appendRow };