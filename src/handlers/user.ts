import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../helpers/auth";

export const createNewUser = async (req, res, next) => {
	try {
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				password: await hashPassword(req.body.password),
				email: req.body.email,
			},
		});

		res.json({ user });
	} catch (err) {
		err.type = "register";
		next(err);
	}
};

export const loginAsUser = async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			email: req.body.email,
		},
	});

	const matchesPassword = await comparePasswords(
		req.body.password,
		user.password
	);

	if (!matchesPassword) {
		// handle error
	}

	user.token = await createJWT(user);

	res.status(200).json({ user });
};

export const getCurrentUser = async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
	});

	res.status(200).json({ user });
};

export const updateCurrentUser = async (req, res, next) => {
	const updatedUser = await prisma.user.update({
		where: {
			id: req.user.id
		},
		data: {
			...req.body
		}
	})

	res.status(200).json({updatedUser})
}
