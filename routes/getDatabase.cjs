const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const carSchema = require("../models/carSchema.cjs");

// Connection to Azure Cosmos DB
const dbUrl = "mongodb://mongobem4-server:mpaX2ymwPXXq5lFxJOkbGrG26PyAnugUV0Ah1J08QeWg28RPlrYu1dbvcjWP2YVeUxgCi3ko2nK4ACDbotvVWQ==@mongobem4-server.mongo.cosmos.azure.com:10255/mongobem4-database?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongobem4-server@";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a model based on the schema
const Car = mongoose.model("Car", carSchema);

// Route to fetch all cars
router.get("/", async (req, res) => {
  console.log("A request was made");
  try {
    // Find all cars in the "cars" collection
    const data = await Car.find();

    // Respond with the data
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching car data:", error);
    res.status(500).json({ error: "Internal Server Error, but you reached the backend!" });
  }
});

module.exports = router;
