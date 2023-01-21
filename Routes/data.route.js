const { Router } = require("express");
const express = require("express");
const { auth } = require("../middleware/auth");
const DataModal = require("../Modal/data.modal");

const Datarouter = Router();

Datarouter.get("/calculate", auth, async (req, res) => {
  const data = await DataModal.find();
  res.send(data);
});

Datarouter.post("/calculate", auth, async (req, res) => {
  // await DataModal.insertMany(req.body);

  console.log(req.body);
  let P = req.body.amount;
  let i = req.body.rate / 100;
  console.log(i);
  let n = req.body.years;

  let a1 = (1 + i) ** n;
  let a2 = a1 - 1;
  let a3 = a2 / i;
  let F = a3 * P;
  let total = P * n;
  let interestGained = F - total;
  // console.log(F, total, interestGained);
  // console.log(F);
  res.send({
    TotalAmount: total,
    TotalInterest: interestGained,
    TotalMaturity: F,
  });
});

module.exports = Datarouter;
