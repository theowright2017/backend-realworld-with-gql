import prisma from "../db";

export const getProfile = async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.params.username,
		},
	});

	if (!user) {
		// handle error
	}

	const { username, bio, image } = user;
	const profile = {
		username,
		bio,
		image,
		following: false, // !!!
	};

	res.status(200).json({ profile });
};

// export const followUser = async (req, res, next) => {
//     const user = await prisma.user.findUnique({
//         where: {
//             username: req.params.username,
//         },
//     })


// }
