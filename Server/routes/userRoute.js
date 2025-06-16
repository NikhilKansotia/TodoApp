import { Router } from "express";
import {
  signup,
  login,
  logout,
  resetPassowrd,
  verifyToken,
} from "../controllers/userController.js";
import isAuthenticted from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuthenticted, logout);
router.put("/reset-password", isAuthenticted, resetPassowrd);
router.post("/verify-token", verifyToken);

export default router;
