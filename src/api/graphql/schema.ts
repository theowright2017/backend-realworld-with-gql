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

    type Article {
        id: ID!
        slug: String!
        title: String!
        description: String!
        body: String!
        authorName: String!
    }

    type Comment {
        id: ID!
        body: String!
        authorName: String!
        articleId: String!
    }

    input UserInput {
        username: String!
    }

    input CreateUserInput {
        username: String!
        password: String!
        email: String!
    }

    input CreateNewArticleInput {
        slug: String!
        title: String!
        description: String!
        body: String!
    }

    input SignInInput {
        email: String!
        password: String!
    }

    input GetArticleInput {
        slug: String!
    }

    input UpdateArticleInput {
        slug: String
        title: String
        description: String
        body: String
    }

    input DeleteArticleInput {
        slug: String!
    }

    input ListArticlesFilterInput {
        authorName: String
        favourited: Boolean
        limit: Int
        offset: Int
    }

    input AddCommentInput {
        body: String!
        articleId: String!
    }

    input DeleteCommentInput {
        commentId: String!
        articleId: String!
    }

    type Query {
        getCurrentUser: User!
        getArticle(input: GetArticleInput!): Article
        listAllArticles(filterConditions: ListArticlesFilterInput): [Article!]!
        getCommentsFromArticle(slug: String!): [Comment]!
    }

    type Mutation {
        createNewUser(input: CreateUserInput!) : User!
        signin(input: SignInInput!): User!
        createNewArticle(input: CreateNewArticleInput!, user: UserInput!): Article!
        updateArticle(input: UpdateArticleInput!, existingSlug: String! ): Article!
        deleteArticle(input: DeleteArticleInput!): Article!
        addCommentToArticle(input: AddCommentInput!, username: String!): Comment!
        deleteCommentFromArticle(input: DeleteCommentInput!): Comment
    }

`;

/**
 *  Missing
 *  - article - favourite / unfavourite
 *  - profile
 *  - tags
 *  - comment
 */

export { schema };
