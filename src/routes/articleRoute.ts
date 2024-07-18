import express from "express";
import { body } from "express-validator";
import { protect } from "../helpers/auth";
import {
	createArticle,
	listArticles,
	getSingleArticle,
	updateArticle,
	deleteArticle,
	favouriteArticle,
	unfavouriteArticle,
} from "../handlers/article";

const articleRouter = express.Router();

articleRouter.post(
	"/articles",
	protect,
	body("slug").exists().isString(),
	body("title").exists().isString(),
	body("description").exists().isString(),
	body("body").exists().isString(),
	// body("tagList"),
	createArticle
);

articleRouter.get("/articles/:slug", getSingleArticle);
articleRouter.put(
	"/articles/:slug",
	protect,
	body("slug").isString(),
	body("title").isString(),
	body("description").isString(),
	body("body").isString(),
	// body("tagList"),
	updateArticle
);

articleRouter.delete("/articles/:slug", protect, deleteArticle);

articleRouter.get("/articles", listArticles);

// router.get("/articles/feed", listFeedArticlesByFollowedUsers)

articleRouter.post("/articles/:slug/favourite", protect, favouriteArticle);
articleRouter.delete("/articles/:slug/favourite", protect, unfavouriteArticle);

export default articleRouter;
