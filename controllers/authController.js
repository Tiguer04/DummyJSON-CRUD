import { pool } from "../config/db.js";
import { hashPassword, comparePassword } from "../services/password.service.js";
import { generateToken } from "../services/auth.service.js";

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

    res.status(201).json({ message: "User registered successfully", user: user[0] });
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

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try{

    const [rows] = await pool.query(
      "SELECT id, username, email, password FROM users WHERE email = ?",
      [email],
    );

    if(rows.length === 0){
      return res.status(404).json({ message: "Invalid email or password. No user found" });
    }

    const isMatch = await comparePassword(password, rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(rows[0]);

    res.status(200).json({ message: "Login successful", token });


  } catch(error){
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }


}

export const verify = (req, res) => {
  console.log("TOKEN VERIFICADO, USUARIO:", req.user);
  res.status(200).json({ message: 'Token is valid', user: req.user });
};