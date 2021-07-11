const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_NmN9U63KYI7mCBmDFW3FFQTb00BFRSujIq");
const { v4: uuidv4 } = require('uuid');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.post("/payment", (req, res) => {
  const { products, token } = req.body;
  console.log("the product details", products);
  console.log("total sum is ", products.price);
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: products.price,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: "the product",
         
        },
        { idempotencyKey }
      );
    })

    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err);
    });
});
app.listen(5000, () => {
  console.log("server is set up at port 5000");
});
