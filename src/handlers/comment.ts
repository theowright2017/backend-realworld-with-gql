import prisma from "../db";

export const addCommentToArticle = async (req, res, next) => {
	const relatedArticle = await prisma.article.findFirst({
		where: {
			slug: req.params.slug,
			authorName: req.user.authorName,
		},
	});

	const addedComment = await prisma.comment.create({
		data: {
			body: req.body.body,
			authorName: req.user.username,
			articleId: relatedArticle.id,
		},
	});

	// handle error

	res.status(200).json({ addedComment });
};

export const getCommentsFromArticle = async (req, res, next) => {
	const { comments } = await prisma.article.findFirst({
		where: {
			slug: req.params.slug,
			authorName: req.user.authorName,
		},
		include: {
			comments: true,
		},
	});

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

	const deletedComment = await prisma.comment.delete({
		where: {
			articleId: relatedArticle.id,
			id: req.params.id,
		},
	});

	res.status(200).json({ deletedComment });
};
