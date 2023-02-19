import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, default: 'no-image.png' },
  createdAt: { type: Date, required: true, default: Date.now() },
  ean: {type: String}
});

interface Product extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  ean?: string;
}

export default mongoose.model<Product>("Product", ProductSchema);