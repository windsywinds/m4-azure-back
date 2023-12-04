const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    imgUrl: { type: String, required: true },
    carType: { type: String, required: true },
    carColor: { type: String, required: true },
    carBrand: { type: String, required: true },
    carPrice: { type: String, required: true }
});

module.exports = carSchema;
