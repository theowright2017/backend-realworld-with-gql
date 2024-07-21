const schema = `#graphql

    type User {
        id: ID!
        username: String!
        password: String
        email: String!
        bio: String
        image: String
        token: String
    }

    input CreateUserInput {
        username: String!
        password: String!
        email: String!
    }

    input SignInInput {
        email: String!
        password: String!
    }

    type Query {
        getCurrentUser: User
    }

    type Mutation {
        createNewUser(input: CreateUserInput!) : User!
        signin(input: SignInInput!): User!
    }

`

export {schema}