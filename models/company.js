import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Price from "./price.model.js";
import PriceTarget from "./price_target.js";
import { getTickerPrice } from "../services/iex.js";

// Schema
const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    ticker: {
      type: String,
      required: true,
    },
    logo: String,
    website: String,
    sector: String,
    latestPrice: Number,
  },
  {
    timestamps: true,
  }
);

// Instance Methods
companySchema.methods.prices = function () {
  return mongoose.model("Price").find({ company_id: this._id });
};

companySchema.methods.setLatestPrice = async function () {
  const priceValue = await getTickerPrice(this.ticker);
  const price = new Price({
    company: this._id,
    value: priceValue,
  });
  await price.save();
  this.latestPrice = price.value;
  return await this.save();
};

// Static Methods
companySchema.statics.removeDependancies = (companyId) => {
  Price.deleteMany({ companyId: companyId }, (err) => {});
  PriceTarget.deleteMany({ companyId: companyId }, (err) => {});
};

// Query Methods
companySchema.query.search = (searchParams) => {
  const reg = new RegExp(`.*${searchParams}.*`, "i");
  this.or([{ name: reg }, { sector: reg }, { ticker: reg }]);
};

// Export
const Company = mongoose.model("Company", companySchema);
export default Company;
