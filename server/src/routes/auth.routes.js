import { Router } from "express";
import { body } from "express-validator";
import { login, logout, me, signup, updateProfile } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Validation middleware
const signupValidation = [
	body('name')
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage('Name must be between 2 and 50 characters'),
	body('email')
		.isEmail()
		.normalizeEmail()
		.withMessage('Please provide a valid email'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
		.withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const loginValidation = [
	body('email')
		.isEmail()
		.normalizeEmail()
		.withMessage('Please provide a valid email'),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
];

const updateProfileValidation = [
	body('name')
		.optional()
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage('Name must be between 2 and 50 characters'),
	body('avatarUrl')
		.optional()
		.isURL()
		.withMessage('Avatar URL must be a valid URL'),
	body('settings')
		.optional()
		.isObject()
		.withMessage('Settings must be an object')
];

// Routes
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);
router.put("/me", requireAuth, updateProfileValidation, updateProfile);

export default router;


