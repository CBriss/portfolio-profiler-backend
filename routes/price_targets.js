import express from "express";
const router = express.Router();

import {
  getPriceTargets,
  createPriceTarget,
  updatePriceTargets,
  destroyPriceTargets,
} from "../controllers/price_targets.js";

// Create new PriceTarget
router.post("/new", createPriceTarget);

// Get all priceTargets
router.get("/", getPriceTargets);

// Get a PriceTarget
router.post("/priceTarget/:id", getPriceTargets);

// Update a PriceTarget
router.post("/update/:id", updatePriceTargets);

// Delete a PriceTarget
router.post("/delete/:id", destroyPriceTargets);

export default router;
