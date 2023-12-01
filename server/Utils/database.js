import mongoose from "mongoose";
import dotenv from "dotenv";
import Scan from "../models/Scan.js";
import Criteria from "../models/Criteria.js";
import { data } from "../data.js";

dotenv.config();

mongoose.set("strictQuery", false);

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URL from environment variables
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB database is connected");
  } catch (err) {
    console.log(err);
    console.log("MongoDB database connection failed");
  }
};

// Function to populate the MongoDB database with predefined data
async function populateDB() {
  await connectDB();
  try {
    // Clear existing data in the Criteria and Scan collections
    await Criteria.deleteMany({});
    await Scan.deleteMany({});

    injectData();
    console.log("Data filled successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to insert criteria into the Criteria collection and return the ObjectId
async function insertCriteria(criteria) {
  const newCriteria = await Criteria.create(criteria);
  return newCriteria._id;
}

// Function to inject predefined data into the Criteria and Scan collections
async function injectData() {
  for (const scan of data) {
    const criteriaIds = await Promise.all(scan.criteria.map(insertCriteria));

    // Create a new Scan document with references to the inserted criteria
    const newScan = await Scan.create({
      id: scan.id,
      name: scan.name,
      tag: scan.tag,
      color: scan.color,
      criteria: criteriaIds,
    });
  }
}

export { connectDB, populateDB };
