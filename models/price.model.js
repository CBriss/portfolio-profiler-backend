import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const priceSchema = new Schema(
  {
    company: {
      type: mongoose.ObjectId,
      ref: "Company",
      index: true,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Query Methods
priceSchema.query.withCompany = (companyId) => {
  return this.where({ companyId: companyId });
};

// Export
const Price = mongoose.model("Price", priceSchema);
export default Price;
