import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Schema
const iexRequestSchema = new Schema(
  {
    url: String,
  },
  {
    timestamps: true,
  }
);

// Static Methods
iexRequestSchema.statics.requestsThisMonth = () => {
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return this.where({ createdAt: { $gte: firstDay, $lte: lastDay } });
};

// Export
const IexRequest = mongoose.model("IexRequest", iexRequestSchema);
export default IexRequest;
