const { createHmac } = require("crypto");
const express = require("express");
const cors = require("cors");
const { json } = require("express");
require("dotenv").config();
const app = express();
app.use(json());
app.use(
  cors({
    origin: "https://bookmymovie-telegram.vercel.app",
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
  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get("hash");
  urlParams.delete("hash");
  urlParams.sort();

  let dataCheckString = "";
  for (const [key, value] of urlParams.entries()) {
    dataCheckString += `${key}=${value}\n`;
  }
  dataCheckString = dataCheckString.slice(0, -1);

  const secretKey = createHmac("sha256", "WebAppData").update(
    process.env.BOT_TOKEN
  );
  const calculatedHash = createHmac("sha256", secretKey.digest())
    .update(dataCheckString)
    .digest("hex");

  if (calculatedHash === hash) {
    return true;
  } else {
    return false;
  }
};

app.get("/", (req, res) => {
  return res.json({ error: "API intended for use with telegram mini app" });
});

app.post("/getInvoice", async (req, res) => {
  const { title, description, photo_url, ticket_data, initData } = req.body;
  const isValidated = validateData(initData);
  if (isValidated) {
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
