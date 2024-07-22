import prisma from "../db";
import {
	addCommentToArticleDB,
	deleteCommentFromArticleDB,
	getCommentsFromArticleDB,
} from "../helpers/dbHelpers";

export const addCommentToArticle = async (req, res, next) => {
	const relatedArticle = await prisma.article.findFirst({
		where: {
			slug: req.params.slug,
			authorName: req.user.authorName,
		},
	});

	const addedComment = await addCommentToArticleDB(
		{
			body: req.body.body,
			articleId: relatedArticle.id,
		},
		req.user.username
	);

	// handle error

	res.status(200).json({ addedComment });
};

export const getCommentsFromArticle = async (req, res, next) => {
	const comments = await getCommentsFromArticleDB(
		req.params.slug,
		req.user.username // !!! might be username???
	);

	// handle error

	res.status(200).json({ comments });
};


export const deleteCommentFromArticle = async (req, res, next) => {
	const relatedArticle = await prisma.article.findFirst({
		where: {
			slug: req.params.slug,
			authorName: req.user.username,
		},
	});

	const deletedComment = await deleteCommentFromArticleDB(
		{
			commentId: req.params.id,
			articleId: relatedArticle.id,
		}
	);

	res.status(200).json({ deletedComment });
};
