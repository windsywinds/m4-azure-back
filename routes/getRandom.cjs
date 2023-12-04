const express = require("express");
const carUrls = require("../data/randomUrls.cjs");
const router = express.Router();

//no need to adjust here. This is where the "roll random" button responds with a URL for an image

router.get("/", (req, res) => {
    console.log("request for randomUrl!")
    const randomIndex = Math.floor(Math.random() * carUrls.length);
      const randomCar = carUrls[randomIndex].imgUrl;

    console.log(randomCar)
    res.status(200).json(randomCar);
  });

  module.exports = router;