import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
export const registerUser = async (req, res) => {
  const { email, password, full_name, gender, mobile_no } = req.body;
  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) return res.status(400).json({ message: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query("INSERT INTO users (email, password, full_name, gender, mobile_no) VALUES ($1,$2,$3,$4,$5) RETURNING *", [email, hashed, full_name, gender, mobile_no]);
    const u = result.rows[0];
    res.status(201).json({ message: "User registered successfully", token: generateToken(u.id), user: { id: u.id, email: u.email, full_name: u.full_name, gender: u.gender, mobile_no: u.mobile_no } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });
    const u = result.rows[0];
    const ok = await bcrypt.compare(password, u.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    res.json({ message: "Login successful", token: generateToken(u.id), user: { id: u.id, email: u.email, full_name: u.full_name, gender: u.gender, mobile_no: u.mobile_no } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
