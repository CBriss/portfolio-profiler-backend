// Imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import companyRoutes from "./routes/companies.js";
import priceTargetRoutes from "./routes/price_targets.js";

// Environment Variables
dotenv.config();

// Create Express App
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Mongoose for Object Modeling
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established!");
});

// Routing
app.use("/companies", companyRoutes);
app.use("/price_targets", priceTargetRoutes);

app.get("/", (req, res) => {
  res.send("Hello!");
});

// Open the Port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on Port ${process.env.PORT || 5000}`);
});
