import express from "express";
import path from "path";
import { pool } from "../config/db.js";

export const startServer = (options) => {
  const { port, public_path = "public" } = options;

  const app = express();

  app.use(express.static(public_path));

  app.get('/auth', async (req, res) => {
    try{
      const result = await pool.query('SELECT 1');
      res.json({message: 'Conexión exitosa a la base de datos'});
    }catch(error){
      console.error(error);
      res.status(500).json({message: 'Error en el servidor'})
    }
  });

  app.get(/.*/, (req, res) => {
    const indexPath = path.join(public_path, "index.html");
    res.sendFile(indexPath);
  });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

};
