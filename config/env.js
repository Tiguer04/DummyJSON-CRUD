import dotenv from 'dotenv';

dotenv.config();

export const envs = {
    PORT: process.env.PORT || 3000,
    PUBLIC_PATH: process.env.PUBLIC_PATH || 'public',
    BDUSER: process.env.BDUSER || 'root',
    BDPASSWORD: process.env.BDPASSWORD || 'root',
    BDHOST: process.env.BDHOST || 'db',
    BDDATABASE: process.env.BDDATABASE || 'products_db',
    BDPORT: process.env.BDPORT || 3306
}