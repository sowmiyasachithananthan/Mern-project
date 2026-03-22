const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");
const Contact = require("./models/Contact");
const Order = require("./models/Order");
const Subscriber = require("./models/Subscriber");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Shreya's Boutique Backend Running 🚀");
});
// Add Product API
app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get All Products API
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message || "Database error" });
  }
});

// Contact form submission
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }
    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();
    res.status(201).json({ message: "Thank you! We'll get back to you soon.", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Place order (checkout)
app.post("/orders", async (req, res) => {
  try {
    const { items, customer } = req.body;
    if (!items?.length || !customer?.name || !customer?.email || !customer?.phone || !customer?.address || !customer?.city || !customer?.pincode) {
      return res.status(400).json({ message: "Items and full customer details are required" });
    }
    const subtotal = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
    const shipping = subtotal >= 5000 ? 0 : 99;
    const total = subtotal + shipping;
    const order = new Order({
      items: items.map((i) => ({
        productId: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity || 1,
        image: i.image
      })),
      subtotal,
      shipping,
      total,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state || "",
        pincode: customer.pincode
      }
    });
    await order.save();
    res.status(201).json({ orderId: order._id, orderNumber: order.orderNumber, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Newsletter subscribe
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { email: email.toLowerCase() },
      { upsert: true }
    );
    res.status(201).json({ message: "Subscribed successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message || "Database error" });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});