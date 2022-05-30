const express = require("express");
const makeRequest = require("./utils").makeRequest;
const app = express();
const port = process.env.PORT || 3000;
var cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/country", async (req, res) => {
  try {
    const result = await makeRequest(
      "GET",
      "/v1/payment_methods/country?country=it"
    );

    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.post("/checkout", async (req, res) => {
  var amount = req.body.amount;
  try {
    const body = {
      amount: amount,
      complete_payment_url: "https://www.google.co.in/",
      country: "IN",
      currency: "INR",
      error_payment_url: "https://www.google.co.in/",
      merchant_reference_id: "950ae8c6-78",
      cardholder_preferred_currency: true,
      language: "en",
      metadata: {
        merchant_defined: true,
      },
      payment_method_types_include: [
        "in_visa_credit_card",
        "in_googlepay_upi_bank",
        "in_paytm_ewallet",
        "in_bharatpay_cash",
      ],
    };
    const result = await makeRequest("POST", "/v1/checkout", body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
