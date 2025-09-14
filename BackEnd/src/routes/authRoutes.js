import { Router } from "express";
import { signUp_get, signUp_post, login_get, login_post, cars_get } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";


const router = Router();

router.get('/signup', signUp_get);
router.post('/signup', signUp_post);
router.get('/login', login_get);
router.post('/login', login_post);
router.get('/cars', requireAuth, cars_get)

export default router;