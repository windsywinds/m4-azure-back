const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const carSchema = require("../models/carSchema.cjs");

// Connection to Azure Cosmos DB
const dbUrl = "mongodb://mongobem4-server:mpaX2ymwPXXq5lFxJOkbGrG26PyAnugUV0Ah1J08QeWg28RPlrYu1dbvcjWP2YVeUxgCi3ko2nK4ACDbotvVWQ==@mongobem4-server.mongo.cosmos.azure.com:10255/mongobem4-database?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongobem4-server@";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a model based on the schema
const Car = mongoose.model("Car", carSchema);

// Route to seed the database
router.post("/", async (req, res) => {
  try {
    const seedData = req.body; // Assuming you are sending the JSON data in the request body

    // Insert seed data into the "cars" collection
    await Car.insertMany(seedData);

    // Respond with success message
    res.status(201).json({ message: "Database seeded successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error seeding the database:", error);
    res.status(500).json({ error: "Internal Server Error when seeding" });
  }
});

module.exports = router;
