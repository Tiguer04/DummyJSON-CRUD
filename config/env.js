import dotenv from 'dotenv';

dotenv.config();

export const envs = {
    PORT: process.env.PORT || 3000,
    PUBLIC_PATH: process.env.PUBLIC_PATH || 'public',
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_USER_PASSWORD: process.env.MYSQL_USER_PASSWORD || 'root',
    MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD || 'root',
    MYSQL_HOST: process.env.MYSQL_HOST || 'db',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'products_db',
    MYSQL_PORT: process.env.MYSQL_PORT || 3306,
    JWT_SECRET: process.env.JWT_SECRET || 'miguelangelcardenas2004-'
}