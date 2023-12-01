import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getData } from "./Utils/getData.js";
import { connectDB, populateDB } from "./Utils/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.get("/", getData);

app.listen(port, () => {
  connectDB();
  // populateDB();
  console.log(`Server running on PORT ${port}`);
});
