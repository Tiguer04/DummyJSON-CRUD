import jwt from "jsonwebtoken";
import { envs } from "../config/env.js";

export const generateToken = (user) =>{
  return jwt.sign({ id: user.id, username: user.username, email: user.email}, envs.JWT_SECRET, { expiresIn: '1h' });
}