import { Router } from "express";
import { login, me, signup, updateProfile } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.put("/me", requireAuth, updateProfile);

export default router;


