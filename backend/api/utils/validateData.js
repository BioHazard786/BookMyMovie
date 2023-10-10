const { createHmac } = require("crypto");

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

module.exports = validateData;
