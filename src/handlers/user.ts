import prisma from "../db";
import { comparePasswords, createJWT, createUser, hashPassword, login } from "../helpers/auth";

export const createNewUser = async (req, res, next) => {
	try {
		const user = await createUser(req.body)

		console.log('user--------', user)
		res.json({ user });
	} catch (err) {
		err.type = "register";
		next(err);
	}
};

export const loginAsUser = async (req, res, next) => {
	const user = await login(req.body)

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
