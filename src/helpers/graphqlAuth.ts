import prisma from "../db";
import jwt from 'jsonwebtoken'

export const getUserFromToken = async (bearer) => {

    if (!bearer) return null

    const [, token] = bearer.split(" ");

    if (!token) {
        // handle error
        console.log('NO TOKEN!!---')
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        user.token = token
        return user
    } catch (err) {
        console.error('incorrect user!! -------', err)
    }
}