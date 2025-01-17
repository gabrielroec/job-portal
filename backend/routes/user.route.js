import express from "express";
import {
  Logout,
  login,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAutheticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(Logout);
router.route("/profile/update").post(isAuthenticated, updateProfile);

export default router;
