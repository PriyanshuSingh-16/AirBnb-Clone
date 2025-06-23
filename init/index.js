if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

// const mongoose = require('mongoose');
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGODB_ATLAS_URL = process.env.ATLAS_DB;
// // const Mongo_url = "mongodb://127.0.0.1:27017/Airbnb";

// main()
//  .then(() => {
//     console.log('Successfully Connected Mongoose');
//  })
//  .catch((err) => {
//     console.log(err);
//  })

// async function main() {
//     await mongoose.connect(Mongo_url);
// }

// const initDB = async () => {
//    await Listing.deleteMany({});
//    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6532b482a4e7bbebc8c4a9aa", }));
//    await Listing.insertMany(initData.data)
//    console.log("data was initialized ...");
// }

// initDB();

// // At the very top of your index.js file
// if (process.env.NODE_ENV !== "production") {
//   require('dotenv').config();
// }

const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Use environment variables for sensitive data
const MONGODB_ATLAS_URL = process.env.ATLAS_DB;
console.log("DEBUG: MONGODB_ATLAS_URL from .env:", MONGODB_ATLAS_URL);

// You can keep a local fallback if you still use it for development, otherwise remove it
const LOCAL_MONGO_URL = "mongodb://127.0.0.1:27017/Airbnb";

main()
  .then(() => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });

async function main() {
    // Attempt to connect to Atlas first, using the environment variable
    try {
        await mongoose.connect(MONGODB_ATLAS_URL);
        console.log("Connected to MongoDB Atlas!");
    } catch (atlasErr) {
        console.warn("Failed to connect to MongoDB Atlas, falling back to local MongoDB:", atlasErr.message);
        // Fallback to local MongoDB if Atlas connection fails
        await mongoose.connect(LOCAL_MONGO_URL);
        console.log("Connected to local MongoDB.");
    }
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        // Assuming your initData.data already has the owner field added and other schema fields
        // If you need to map the owner from a hardcoded ID, it would be here:
        // initData.data = initData.data.map((obj) => ({ ...obj, owner: "6532b482a4e7bbebc8c4a9aa" }));
        await Listing.insertMany(initData.data);
        console.log("Data was initialized successfully.");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
};

initDB(); // Call the function to initialize the database