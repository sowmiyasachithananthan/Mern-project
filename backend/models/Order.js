const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  price: Number,
  quantity: Number,
  image: String
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    items: [orderItemSchema],
    subtotal: Number,
    shipping: Number,
    total: Number,
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String },
      pincode: { type: String, required: true }
    },
    status: { type: String, default: "pending", enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"] }
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `SB${String(count + 1).padStart(5, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
