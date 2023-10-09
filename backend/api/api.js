const { createHmac } = require("crypto");
const express = require("express");
const cors = require("cors");
const { json } = require("express");
require("dotenv").config();
const app = express();
app.use(json());

// Using cors
app.use(
  cors({
    origin: "https://bookmymovie-telegram.vercel.app", // Froentend URL
  })
);

const PORT = process.env.PORT || 3000;

const fetchInvoice = async (url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
    });
    const invoiceData = await response.json();
    console.log(invoiceData);
    return invoiceData;
  } catch (error) {
    console.log("Error in Telegram API", error);
    return { ok: false, error_code: 500, description: "Error in Telegram API" };
  }
};

// formatting the value of prices params in the form of [{"label": String, "amount": Number }]
const calculatePrices = (ticket_data) => {
  let prices = [];
  const totalBill =
    ticket_data.price_per_ticket * ticket_data.ticket_count * 100;
  prices.push({
    label: `🎫 Ticket x${ticket_data.ticket_count}`,
    amount: totalBill,
  });
  if (ticket_data.ticket_count > 4) {
    prices.push({
      label: "Discount",
      amount: -8000 * (ticket_data.ticket_count - 4),
    });
  }
  return JSON.stringify(prices);
};

const validateData = (initData) => {
  // Transforms initData string into object
  const urlParams = new URLSearchParams(initData);

  // Getting hash from iniData and deleting it
  const hash = urlParams.get("hash");
  urlParams.delete("hash");

  // sorted alphabetically
  urlParams.sort();

  // Data-check-string is a chain of all received fields in the format key=<value> seperated by \n
  let dataCheckString = "";
  for (const [key, value] of urlParams.entries()) {
    dataCheckString += `${key}=${value}\n`;
  }
  dataCheckString = dataCheckString.slice(0, -1);

  // HMAC-SHA-256 signature of the bot's token with the constant string WebAppData used as a key.
  const secretKey = createHmac("sha256", "WebAppData").update(
    process.env.BOT_TOKEN
  );

  // The hexadecimal representation of the HMAC-SHA-256 signature of the data-check-string with the secret key
  const calculatedHash = createHmac("sha256", secretKey.digest())
    .update(dataCheckString)
    .digest("hex");

  // Checking telegram hash and calculated hash for validating data
  if (calculatedHash === hash) {
    return true;
  } else {
    return false;
  }
};

// Home Route
app.get("/", (req, res) => {
  return res.json({ error: "API intended for use with telegram mini app" });
});

// Route for getting payment invoice
app.post("/getInvoice", async (req, res) => {
  const { title, description, photo_url, ticket_data, initData } = req.body;

  // Validating data received via the Mini App
  const isValidated = validateData(initData);
  if (isValidated) {
    // Transforms recieved data into object
    const queryParams = new URLSearchParams({
      title: title,
      description: description,
      payload: JSON.stringify({
        num_tickets: ticket_data.ticket_count,
        movie_name: title,
        schedule: ticket_data.schedule,
      }),
      provider_token: process.env.PROVIDER_TOKEN,
      currency: "INR",
      prices: calculatePrices(ticket_data),
      photo_url: photo_url,
      need_name: true,
      need_email: true,
    });

    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/createInvoiceLink`;
    // Sending Post request to telegram bot api for invoice link
    const invoiceData = await fetchInvoice(`${url}?${queryParams.toString()}`);
    return res.json(invoiceData);
  } else {
    return res.json({ ok: false, description: "Data not from telegram" });
  }
});

app.listen(PORT, () =>
  console.log(`Express app running on  http://localhost:${PORT}`)
);

module.exports = app;
