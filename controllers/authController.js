import express from "express";
import { pool } from "../config/db.js";
import { hashPassword } from "../services/password.service.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_\.])[A-Za-z\d@$!%*?&\-_\.]{8,}$/;

  if(!emailRegex.test(email)){
    return res.status(400).json({ message: "Invalid email format" });
  }

  if(!passwordRegex.test(password)){
    return res.status(400).json({ message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character" });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const [rows] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );

    const [user] = await pool.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [rows.insertId],
    );

    res.json({ message: "User registered successfully", user: user[0] });
  } catch (error) {

    if(error.code === 'ER_DUP_ENTRY' && error.message.includes('username')){
      return res.status(400).json({ message: "Username is already in use" });
    } else if(error.code === 'ER_DUP_ENTRY' && error.message.includes('email')){
      return res.status(400).json({ message: "Email is already in use" });
    }

    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};
