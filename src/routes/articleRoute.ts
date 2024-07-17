import express from "express";
import { body } from "express-validator";
import { protect } from "../helpers/auth";
import {
	createArticle,
	listArticles,
	getSingleArticle,
	updateArticle,
	deleteArticle,
} from "../handlers/article";

const articleRouter = express.Router();

articleRouter.post(
	"/articles",
	protect,
	body("slug").exists().isString(),
	body("title").exists().isString(),
	body("description").exists().isString(),
	body("body").exists().isString(),
	createArticle
);

articleRouter.get("/articles/:slug", getSingleArticle);
articleRouter.put(
	"/articles/:slug",
	protect,
	body("slug").exists().isString(),
	body("title").exists().isString(),
	body("description").exists().isString(),
	body("body").exists().isString(),
	updateArticle
);

articleRouter.delete("/articles/:slug", protect, deleteArticle);

articleRouter.get("/articles", listArticles);

// router.get("/articles/feed", listFeedArticlesByFollowedUsers)


// router.post("/articles/:slug/favourite", favouriteArticle)
// router.delete("/articles/:slug/favourite", unfavouriteArticle)

export default articleRouter;
