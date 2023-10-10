// formatting the value of prices params in the form of [{"label": String, "amount": Number }]
const calculatePrices = (ticket_data) => {
  let prices = [];
  const totalBill =
    ticket_data.price_per_ticket * ticket_data.ticket_count * 100;
  prices.push({
    label: `🎫 Ticket x${ticket_data.ticket_count}`,
    amount: totalBill,
  });

  // Adding optional discount
  if (ticket_data.ticket_count > 4) {
    prices.push({
      label: "Discount",
      amount: -8000 * (ticket_data.ticket_count - 4),
    });
  }
  return JSON.stringify(prices);
};

module.exports = calculatePrices;
