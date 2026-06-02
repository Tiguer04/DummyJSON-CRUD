import mysql from 'mysql2/promise';
import { envs } from '../config/env.js';

export const pool = mysql.createPool({
  user: envs.MYSQL_USER,
  password: envs.MYSQL_USER_PASSWORD,
  host: envs.MYSQL_HOST,
  database: envs.MYSQL_DATABASE,
  port: envs.MYSQL_PORT
})