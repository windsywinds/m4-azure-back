
const fs = require("fs");
const path = require('path');


const { MongoClient, ObjectId } = require('mongodb');


const seedCars = async (filePath) => {
    console.info('Attempting to read file at path:', filePath);
    if (typeof filePath !== 'string' ) {
        console.info('Path not valid. Format: ./dir/data/seed.json');
    }
    const client = new MongoClient('mongodb://localhost:27017/')
    try {
        const absolutePath = path.join(process.cwd(), filePath);
        console.info('Attempting to read file at path:', absolutePath);
        const jsonData = JSON.parse(await fs.promises.readFile(absolutePath, 'utf-8'));


      await client.connect();
      const database = client.db('turnersDB');
      const collection = database.collection('cars');
      await collection.insertMany(jsonData);
      console.info('Number of new cars added:', jsonData.length);
    } finally {
        await client.close();
    }
  }
const addCar = async (carData) => {
    const client = new MongoClient('mongodb://localhost:27017/')
    try {
      await client.connect();
      const database = client.db('turnersDB');
      const collection = database.collection('cars');
      const result = await collection.insertOne(carData);
      console.info(`Added new car entry with ID: ${result.insertedId}`);
    } finally {
        await client.close();
    }
  }
const findCarByAny = async (keyword) => {
    const client = new MongoClient('mongodb://localhost:27017/')
    try {
        await client.connect();
        const database = client.db('turnersDB');
        const collection = database.collection('cars');
        const search = new RegExp(keyword, 'i') //'i' indicates this is case insensitive
        const cars = await collection.find({
            $or: [{ carBrand: search }, { carType: search }, { carColor: search }],
                }).toArray()
        console.info(cars);
        console.info(`${cars.length} matches`) //let us know how many matches there are
    } finally {
        await client.close();
    }    
}
const listAllCars = async () => { 
    const client = new MongoClient('mongodb://localhost:27017/')
    try {
        await client.connect();
        const database = client.db('turnersDB');
        const collection = database.collection('cars');
        const car = await collection.find({}).toArray();
        console.info(car);
        console.info(`${car.length} matches`)
    } finally {
        await client.close();
    }
}
const removeCar = async (removalId) => { 
    const client = new MongoClient('mongodb://localhost:27017/')
    try {
        await client.connect();
        const database = client.db('turnersDB');
        const collection = database.collection('cars');
        const carId = new ObjectId(removalId);
        await collection.findOneAndDelete({ _id: carId });
        console.info("Car removed");
    } finally {
        await client.close();
    }
}
const wipeDatabase = async (answer) => {
    if (answer === 'y' || 'Y') {
        const client = new MongoClient('mongodb://localhost:27017/')
        try {
        await client.connect();
        const database = client.db('turnersDB');
        const collection = database.collection('cars');
        await collection.drop({})
        console.info("Wipe complete")
        } finally {
        await client.close();
        }
    } else {
        console.info("Wipe aborted")
    }

}


module.exports = { seedCars, addCar, removeCar, listAllCars, findCarByAny, wipeDatabase }