import { GraphQLError } from "graphql";
import { createUser, login } from "../../helpers/auth";

const resolvers = {
	Query: {
		getCurrentUser: async (_, __, ctx) => {
			return ctx.user;
		},
	},
	Mutation: {
		createNewUser: async (_, args) => {
			const user = await createUser(args.input);

			if (!user) {
				throw new GraphQLError("could not create user", {
					extensions: { code: "AUTH_ERROR" },
				});
			}

			return user;
		},
        signin: async (_, args) => {
            const user = await login(args.input)

            if (!user || !user.token) {
                throw new GraphQLError('UNAUTHORIZED', {
                    extensions: {code: 'AUTH_ERROR'}
                })
            }

            return user
        }
	},

};

export { resolvers };
