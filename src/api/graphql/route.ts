import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { schema } from "./schema";
import { resolvers } from "./resolvers";
import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getUserFromToken } from "../../helpers/graphqlAuth";

console.log("GQL ROute---");

let plugins = [];
if (process.env.NODE_ENV === "production") {
	plugins = [
		ApolloServerPluginLandingPageProductionDefault({
			embed: true,
			graphRef: "myGraph@prod",
		}),
	];
} else {
	plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];
}

// const server = new ApolloServer({
// 	schema: addMocksToSchema({
// 		schema: makeExecutableSchema({ typeDefs: schema, resolvers }),
// 	}),
// 	plugins
// });

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	plugins,
});

startStandaloneServer(server, {
	context: async ({ req }) => {
		const user = await getUserFromToken(req.headers["authorization"] ?? "");
		return {
			req,
			user,
		};
	},
	listen: { port: 4000 },
});
