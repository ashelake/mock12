const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
  amount: Number,
  rate: Number,
  years: Number,
  userID: String,
});

const DataModal = mongoose.model("mock-xii-data", DataSchema);

module.exports = DataModal;
