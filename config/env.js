import dotenv from 'dotenv';

dotenv.config();

export const envs = {
    PORT: process.env.PORT || 3000,
    PUBLIC_PATH: process.env.PUBLIC_PATH || 'public'
}