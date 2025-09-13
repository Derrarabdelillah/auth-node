import { Router } from "express";
import { signUp_get, signUp_post, login_get, login_post } from "../controllers/authController.js";

const router = Router();

router.get('/signup', signUp_get);
router.post('/signup', signUp_post);
router.get('/login', login_get);
router.post('/login', login_post);

export default router;