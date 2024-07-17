import express from "express";
import { body } from "express-validator";
import { protect } from "../helpers/auth";
import {
	addCommentToArticle,
	deleteCommentFromArticle,
	getCommentsFromArticle,
} from "../handlers/comment";

const commentRouter = express.Router();

commentRouter.post(
	"/articles/:slug/comments",
	protect,
	body("body").exists().isString(),
	addCommentToArticle
);
commentRouter.get("/articles/:slug/comments", protect, getCommentsFromArticle);

commentRouter.delete(
	"/articles/:slug/comments/:id",
	protect,
	deleteCommentFromArticle
);

export default commentRouter;
