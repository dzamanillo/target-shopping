const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

startServer = async () => {
	try {
		const server = new ApolloServer({
			typeDefs,
			resolvers,
			context: authMiddleware,
		});
		await server.start();
		server.applyMiddleware({ app });
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	} catch (err) {
		console.log("startServer err: ", err);
	}
};

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
	try {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
		});
	} catch (err) {
		console.log("db open err: ", err);
	}
});
