import { Schema } from "mongoose";

const mongoose = require("mongoose");

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const ItemModel = mongoose.model("Item", ItemSchema);

export default ItemModel;
