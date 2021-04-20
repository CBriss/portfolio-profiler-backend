import express from "express";
const router = express.Router();

import {
  getCompanies,
  createCompany,
  updateCompanies,
  destroyCompanies,
  listCompanies,
} from "../controllers/companies.js";

// Create new Company
router.post("/new", createCompany);

// Get all companies
router.get("/", getCompanies);

// Get a Company
router.post("/company/:id", getCompanies);

// Update a Company
router.post("/update/:id", updateCompanies);

// Delete a Company
router.post("/delete/:id", destroyCompanies);

// List Companies and Their IDs By Sector
router.get("/list", listCompanies);

export default router;
