import express from "express";
import { body } from "express-validator";
import {
	createNewUser,
	getCurrentUser,
	loginAsUser,
	updateCurrentUser,
} from "../handlers/user";
import { protect } from "../helpers/auth";

const userRouter = express.Router();

userRouter.post(
	"/users",
	body("username").exists().isString(),
	body("password").exists().isString(),
	body("email").exists().isString(),
	createNewUser
);

userRouter.post(
	"/users/login",
	body("email").exists().isString(),
	body("password").exists().isString(),
	loginAsUser
);

userRouter.get("/user", protect, getCurrentUser);

userRouter.put(
	"/user",
	protect,
	body("email").isString(),
	body("username").isString(),
	body("password").isString(),
	body("image").isString(),
	body("bio").isString(),
	updateCurrentUser
);

export default userRouter;
