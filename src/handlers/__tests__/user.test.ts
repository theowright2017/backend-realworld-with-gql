import * as user from '../user'

describe('user handler', () => {
    it('should create a new user', async () => {
        const userObj  = {username: 'hello', password: 'hi', email: 't@g.com'}
        const req = {body: userObj}
        const res = {json({userObj}) {
            expect(userObj.username).toBe("hello")
        }}

        await user.createNewUser(req, res, () => {})
    })

    it('should fail without an email', async () => {
        const userObj  = {username: 'hello', password: 'hi'}
        const req = {body: userObj}
        const res = {json({userObj}) {}}

        await user.createNewUser(req, res, (err) => {
            expect(err.type).toBe('register')
        })
    })
})