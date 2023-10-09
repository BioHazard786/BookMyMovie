const useCustomTelegramEvent = () => {
  window.Telegram.WebApp.onEvent("invoiceClosed", ({ url, status }) => {
    console.log("event listener", url, status);
  });
};

export default useCustomTelegramEvent;
