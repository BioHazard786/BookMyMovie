const express = require("express");
const cors = require("cors");
const { json } = require("express");
const validateData = require("./utils/validateData");
const calculatePrices = require("./utils/formatPrice");
const fetchInvoice = require("./utils/fetchInvoice");
const swaggerDocs = require("./swagger");
require("dotenv").config();
const app = express();

// Using JSON middleware
app.use(json());

// Using cors
app.use(
  cors({
    origin: "https://bookmymovie-telegram.vercel.app", // Frontend URL
  })
);

const PORT = process.env.PORT || 3000;

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get("/", (req, res) => {
  res.statusCode = 200;
  return res.json({ result: "App is up and running" });
});

/**
 * @openapi
 * '/getInvoice':
 *  post:
 *     tags:
 *     - Fetch Invoice
 *     description: Responds with invoice link and status code 200 if telegram bot api successfully created invoice link
 *     summary: Fetch payment invoice from telegram bot api
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              required:
 *                - title
 *                - description
 *                - photo_url
 *                - ticket_data
 *                - initData
 *              properties:
 *                title:
 *                  type: string
 *                  default: Inception
 *                description:
 *                  type: string
 *                  default: Your mind is the scene of the crime.
 *                photo_url:
 *                  type: string
 *                  default: https://image.tmdb.org/t/p/w500/b5xAbWqVNsp14lCtR2vhaURWo7G.jpg
 *                initData:
 *                  type: string
 *                  default: initData to be send from telegram web app
 *                ticket_data:
 *                  type: object
 *                  properties:
 *                    ticket_count:
 *                      type: number
 *                      default: 5
 *                    price_per_ticket:
 *                      type: number
 *                      default: 200
 *                    schedule:
 *                      type: string
 *                      default: Tue 10 Oct 13:10
 *
 *
 *
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                result:
 *                  type: string
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                  default: false
 *                result:
 *                  type: string
 *                  default: Data not from telegram
 */
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
    res.statusCode = 200;
    return res.json(invoiceData);
  } else {
    res.statusCode = 400;
    return res.json({ ok: false, description: "Data not from telegram" });
  }
});

app.listen(PORT, () => {
  console.log(`Express app running on  http://localhost:${PORT}`);

  swaggerDocs(app, PORT);
});

module.exports = app;
