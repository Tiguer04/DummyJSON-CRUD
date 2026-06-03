import express from "express";
import path from "path";
import { pool } from "../config/db.js";
import authRoutes from '../routes/authRoutes.js';
import { checkToken } from "../middlewares/authMiddleware.js";

export const startServer = (options) => {
  const { port, public_path = "public" } = options;

  const app = express();

  app.use(express.json());

  app.use(express.static(public_path, { index: false }));

  app.use('/auth', authRoutes);
  
  app.get('/', (req, res) =>{
    const loginPath = path.resolve(public_path, "login.html");
    res.sendFile(loginPath);
  })

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

};
