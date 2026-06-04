import jwt from "jsonwebtoken";
import { envs } from "../config/env.js";

export const checkToken = (req, res, next) =>{

  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({ message: 'You are not authorized' });
  }

  const token = authHeader.split(' ')[1];

  try{

    const decoded = jwt.verify(token, envs.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'You are not authorized' });
  }

}