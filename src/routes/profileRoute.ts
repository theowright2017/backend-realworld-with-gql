import express from "express";
import { body } from "express-validator";
import { protect } from "../helpers/auth";
import { getProfile } from "../handlers/profile";

const profileRouter = express.Router();

profileRouter.get("/profiles/:username", protect, getProfile);

// profileRouter.post("/profiles/:username/follow", protect, followUser);
// router.delete("/profiles/:username/follow", unfollowUser);

export default profileRouter;
