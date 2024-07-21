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

const server = new ApolloServer({
	schema: addMocksToSchema({
		schema: makeExecutableSchema({ typeDefs: schema, resolvers }),
	}),
	plugins
});

startStandaloneServer(server, {
	listen: { port: 4000 },
});

// console.log(`Server ready on: ${url} `)