require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const seedData = require("./seedData");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
    await Product.deleteMany({});
    await Product.insertMany(seedData);
    console.log("Sample products added successfully! 🎉");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
