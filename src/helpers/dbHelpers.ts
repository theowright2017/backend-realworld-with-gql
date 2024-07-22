import prisma from "../db";

export const createNewArticle = async (input, username) => {
	const { slug, title, description, body } = input;
	try {
		const newArticle = await prisma.article.create({
			data: {
				slug,
				title,
				description,
				body,
				authorName: username,
			},
		});

		return newArticle;
	} catch (err) {
		throw new Error(err);
	}
};

export const getArticle = async (slug) => {
	try {
		const article = await prisma.article.findFirst({
			where: {
				slug: slug,
			},
		});

		return article;
	} catch (err) {
		console.error(err);
	}
};

export const updateArticleDB = async (input, existingSlug, username) => {
	try {
		const updatedArticle = await prisma.article.update({
			where: {
				slug: existingSlug,
				authorName: username,
			},
			data: {
				...input,
			},
		});

		return updatedArticle;
	} catch (err) {
		console.error(err);
	}
};

export const deleteArticleDB = async (slug, username) => {
	try {
		const deletedArticle = await prisma.article.delete({
			where: {
				slug: slug,
				authorName: username,
			},
		});

		return deletedArticle;
	} catch (err) {
		console.error(err);
	}
};

export const listArticlesDB = async (filters) => {
	try {
		const { tag, authorName, favourited, limit = 20, offset = 0 } = filters;

		const filterConditions = [];

		if (tag) {
			// filterConditions.push({
			// 	tagList: {
			// 		contains: tag,
			// 	},
			// });
		} else if (authorName) {
			filterConditions.push({
				authorName: {
					contains: authorName,
				},
			});
		} else if (favourited) {
			filterConditions.push({
				favourited: {
					contains: favourited, // !!!
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
			take: limit,
		});
		return articles;
	} catch (err) {
		console.error(err);
	}
};
