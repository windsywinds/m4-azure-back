const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const carSchema = require("../models/carSchema.cjs");

// Connection to MongoDB
const dbUrl = "mongodb://localhost:27017/turnersDB";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a model based on the schema
const Car = mongoose.model("Car", carSchema);

// Route to fetch all cars
router.get("/", async (req, res) => {
    console.log("A request was made")
  try {
    // Find all cars in the "cars" collection
    const data = await Car.find();

    // Respond with the data
    res.status(200).json(data);
    console.log(data)
  } catch (error) {
    // Handle errors
    console.error("Error fetching car data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
