import prisma from "../db";
import {
	createNewArticle,
	deleteArticleDB,
	getArticle,
	listArticlesDB,
	updateArticleDB,
} from "../helpers/dbHelpers";

const createArticle = async (req, res, next) => {
	const newArticle = await createNewArticle(req.body, req.user);

	res.status(200).json({ newArticle });
};

const getSingleArticle = async (req, res, next) => {
	const article = await getArticle(req.params.slug);

	res.status(200).json({ article });
};

const updateArticle = async (req, res, next) => {
	const updatedArticle = await updateArticleDB(
		req.body,
		req.params.slug,
		req.user.username
	);

	res.status(200).json({ updatedArticle });
};

const deleteArticle = async (req, res, next) => {
	const deletedArticle = await deleteArticleDB(
		req.params.slug,
		req.user.username
	);

	// handle error

	res.status(200).json({ deletedArticle });
};

const listArticles = async (req, res, next) => {
	const articles = await listArticlesDB(req.query);

	res.status(200).json({ articles });
};

const favouriteArticle = async (req, res, next) => {
	const article = await prisma.article.update({
		where: {
			slug: req.params.slug,
		},
		data: {
			favourited: true,
		},
	});

	res.status(200).json({ article });
};

const unfavouriteArticle = async (req, res, next) => {
	const article = await prisma.article.update({
		where: {
			slug: req.params.slug,
		},
		data: {
			favourited: false,
		},
	});

	res.status(200).json({ article });
};

export {
	createArticle,
	getSingleArticle,
	listArticles,
	updateArticle,
	deleteArticle,
	favouriteArticle,
	unfavouriteArticle,
};
