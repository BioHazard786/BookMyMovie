import data from "../data/data.json";
import {
  telegramHapticFeedback,
  telegramMainButton,
  telegramWebApp,
} from "./telegramWebAppComponents";

const handlePaymentStatus = (status, snackBarToggle) => {
  window.Telegram.WebApp.MainButton.hideProgress();
  if (status == "paid") {
    telegramHapticFeedback.notificationOccurred("success");
    window.Telegram.WebApp.close();
  } else if (status == "cancelled") {
    telegramHapticFeedback.notificationOccurred("error");
    snackBarToggle("Your order was cancelled");
  } else if (status == "pending") {
    telegramHapticFeedback.notificationOccurred("warning");
    snackBarToggle("Payment pending");
  } else {
    telegramHapticFeedback.notificationOccurred("error");

    showSnackBar("Payment failed, try again");
  }
};

// function for fetching payment invoice from the api
export const bookTickets = async (
  movieID,
  seatCount,
  snackBarToggle,
  schedule
) => {
  telegramMainButton.showProgress();
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
        initData: telegramWebApp.initData,
      }),
    });
    const invoice = await response.json();
    if (invoice.ok) {
      telegramWebApp.openInvoice(invoice.result, (status) => {
        handlePaymentStatus(status, snackBarToggle);
      });
    } else {
      telegramHapticFeedback.notificationOccurred("error");
      telegramMainButton.hideProgress();
      console.log(invoice);
      if (invoice.description) return snackBarToggle(invoice.description);
      else return snackBarToggle("Server Error");
    }
  } catch (error) {
    telegramHapticFeedback.notificationOccurred("error");
    telegramMainButton.hideProgress();
    return snackBarToggle("Fetching invoice failed");
  }
};
