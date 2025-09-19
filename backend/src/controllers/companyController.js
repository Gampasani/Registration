// src/controllers/companyController.js
import pool from "../config/db.js";
import { validationResult } from "express-validator";

// ==========================
// Create Company
// ==========================
export const createCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const {
    company_name,
    address,
    city,
    state,
    country,
    postal_code,
    website,
    logo_url,
    banner_url,
    industry,
    founded_date,
    description,
    social_links,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO company_profile 
       (owner_id, company_name, address, city, state, country, postal_code,
        website, logo_url, banner_url, industry, founded_date, description, social_links)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *`,
      [
        req.user.id,
        company_name || "",
        address || "",
        city || "",
        state || "",
        country || "",
        postal_code || "",
        website || "",
        logo_url || "",
        banner_url || "",
        industry || "",
        founded_date || null, // ✅ null instead of empty string
        description || "",
        social_links ? JSON.stringify(social_links) : "{}", // ✅ default {}
      ]
    );

    res.status(201).json({
      message: "Company created successfully",
      company: result.rows[0],
    });
  } catch (e) {
    console.error("❌ Error in createCompany:", e.message);
    res.status(500).json({ message: e.message });
  }
};

// ==========================
// Get All Companies
// ==========================
export const getCompanies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM company_profile ORDER BY id DESC");
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// ==========================
// Update Company
// ==========================
export const updateCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { id } = req.params;
  const {
    company_name,
    address,
    city,
    state,
    country,
    postal_code,
    website,
    logo_url,
    banner_url,
    industry,
    founded_date,
    description,
    social_links,
  } = req.body;

  try {
    const found = await pool.query("SELECT * FROM company_profile WHERE id=$1", [id]);
    if (found.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (found.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this company" });
    }

    const result = await pool.query(
      `UPDATE company_profile 
       SET company_name=$1, address=$2, city=$3, state=$4, country=$5,
           postal_code=$6, website=$7, logo_url=$8, banner_url=$9,
           industry=$10, founded_date=$11, description=$12, social_links=$13,
           updated_at=CURRENT_TIMESTAMP
       WHERE id=$14 RETURNING *`,
      [
        company_name || found.rows[0].company_name,
        address || found.rows[0].address,
        city || found.rows[0].city,
        state || found.rows[0].state,
        country || found.rows[0].country,
        postal_code || found.rows[0].postal_code,
        website || found.rows[0].website,
        logo_url || found.rows[0].logo_url,
        banner_url || found.rows[0].banner_url,
        industry || found.rows[0].industry,
        founded_date || found.rows[0].founded_date,
        description || found.rows[0].description,
        social_links ? JSON.stringify(social_links) : found.rows[0].social_links,
        id,
      ]
    );

    res.json({
      message: "Company updated successfully",
      company: result.rows[0],
    });
  } catch (e) {
    console.error("❌ Error in updateCompany:", e.message);
    res.status(500).json({ message: e.message });
  }
};

// ==========================
// Delete Company
// ==========================
export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const found = await pool.query("SELECT * FROM company_profile WHERE id=$1", [id]);
    if (found.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (found.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this company" });
    }

    await pool.query("DELETE FROM company_profile WHERE id=$1", [id]);
    res.json({ message: "Company deleted successfully" });
  } catch (e) {
    console.error("❌ Error in deleteCompany:", e.message);
    res.status(500).json({ message: e.message });
  }
};
