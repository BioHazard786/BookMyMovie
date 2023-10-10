// function for fecthing invoice from telegram bot api
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
    return { ok: false, description: "Error in Telegram API" };
  }
};

module.exports = fetchInvoice;
