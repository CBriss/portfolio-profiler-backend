import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const priceTargetSchema = new Schema({
  company: {
    type: mongoose.ObjectId,
    ref: "Company",
    index: true,
  },
  lowEstimate5Yr: {
    type: Number,
    default: 0,
  },
  highEstimate5Yr: {
    type: Number,
    default: 0,
  },
});

// Export
const PriceTarget = mongoose.model("PriceTarget", priceTargetSchema);
export default PriceTarget;
