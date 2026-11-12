const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Vercel / Render / Nginx er pichone thakle rate-limit e asol user IP pete lagbe
app.set("trust proxy", 1);

/* =======================
   GLOBAL CORS CONFIG
======================= */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://sculptra.vercel.app",
    "https://sculptraessence.co.uk",
    "https://www.sculptraessence.co.uk",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 🔥 MUST BE FIRST
app.use(cors(corsOptions));

// 🔥 MUST HANDLE PREFLIGHT
app.options("*", cors(corsOptions));

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json({ limit: "10kb" }));

/* =======================
   ROUTES
======================= */


app.use("/", require("./routes/enquiry.routes")); 

/* =======================
   ROOT
======================= */
app.get("/", (req, res) => {
  res.send("Sculptra Server is Working");
});

module.exports = app;