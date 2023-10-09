import data from "../data/data.json";

const handlePaymentStatus = (status, snackBarToggle) => {
  window.Telegram.WebApp.MainButton.hideProgress();
  if (status == "paid") {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    window.Telegram.WebApp.close();
  } else if (status == "cancelled") {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
    snackBarToggle("Your order was cancelled");
  } else if (status == "pending") {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("warning");
    snackBarToggle("Payment pending");
  } else {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");

    showSnackBar("Payment failed, try again");
  }
};

export const bookTickets = async (
  movieID,
  seatCount,
  snackBarToggle,
  schedule
) => {
  window.Telegram.WebApp.MainButton.showProgress();
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/getInvoice`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data[movieID].title,
        description: data[movieID].tagline,
        photo_url: data[movieID].backdrop_poster,
        ticket_data: {
          ticket_count: seatCount,
          price_per_ticket: data[movieID].price_per_ticket,
          schedule: schedule,
        },
        initData: window.Telegram.WebApp.initData,
      }),
    });
    const invoice = await response.json();
    if (invoice.ok) {
      window.Telegram.WebApp.openInvoice(invoice.result, (status) => {
        handlePaymentStatus(status, snackBarToggle);
      });
    } else {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
      window.Telegram.WebApp.MainButton.hideProgress();
      console.log(invoice);
      return snackBarToggle("Client Error");
    }
  } catch (error) {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
    window.Telegram.WebApp.MainButton.hideProgress();
    return snackBarToggle("Fetching invoice failed");
  }
};
