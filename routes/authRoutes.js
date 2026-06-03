import express from "express";
import { register, login, verify } from "../controllers/authController.js";
import { checkToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', checkToken, verify);


export default router;