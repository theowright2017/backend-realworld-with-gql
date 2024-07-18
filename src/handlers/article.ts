import prisma from "../db";

const createArticle = async (req, res, next) => {
	const { slug, title, description, body } = req.body;

	const newArticle = await prisma.article.create({
		data: {
			slug,
			title,
			description,
			body,
			authorName: req.user.username,
			// tagList: req.body.tagList,
		},
	});

	if (!newArticle) {
		// handle error
	}

	res.status(200).json({ newArticle });
};

const getSingleArticle = async (req, res, next) => {
	const article = await prisma.article.findFirst({
		where: {
			slug: req.params.slug,
		},
	});

	if (!article) {
		// handle error
	}

	res.status(200).json({ article });
};

const updateArticle = async (req, res, next) => {
	const updatedArticle = await prisma.article.update({
		where: {
			slug: req.params.slug,
			authorName: req.user.username,
		},
		data: {
			...req.body
		},
	});

	if (!updateArticle) {
		// handle error
	}

	res.status(200).json({ updatedArticle });
};

const deleteArticle = async (req, res, next) => {
	const deletedArticle = await prisma.article.delete({
		where: {
			slug: req.params.slug,
			authorName: req.user.username,
		},
	});

	// handle error

	res.status(200).json({ deletedArticle });
};

const listArticles = async (req, res, next) => {
	const { tag, authorName, favourited, limit = 20, offset = 0 } = req.query;
	console.log("QER--", req.query);
	const filterConditions = [];

	if (tag) {
		filterConditions.push({
			tagList: {
				contains: tag,
			},
		});
	} else if (authorName) {
		filterConditions.push({
			authorName: {
				contains: authorName,
			},
		});
	} else if (favourited) {
		filterConditions.push({
			favourited: {
				contains: true, // !!!
			},
		});
	}

	const articles = await prisma.article.findMany({
		where: {
			AND: filterConditions,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	if (!articles) {
		// handle error
	}

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
