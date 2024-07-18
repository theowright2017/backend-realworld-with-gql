import app from "../server/server";
import supertest from "supertest";

describe('GET /', () => {
    it('should return something back from home page', async () => {
        const res = await supertest(app).get("/")

        expect(res.body.message).toBe("You Are Home")
    })
})