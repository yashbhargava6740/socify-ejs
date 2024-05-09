const mongoose = require("mongoose");

const shirtSchema = new mongoose.Schema({
  fabric: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  pattern: {
    type: String,
    required: true,
    trim: true,
  },
  shirtColor: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  timestamps: {
    type: String,
    required: true,
    trim: true,
    default: Date.now(),
  },
});

const Shirt = mongoose.model("Shirt", shirtSchema);
module.exports = Shirt;