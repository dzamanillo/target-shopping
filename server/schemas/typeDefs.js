// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID!
    firstname: String
    lastname: String
    username: String
    email: String
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): Auth
    addUser(
      firstname: String!
      lastname: String!
      username: String!
      email: String!
      password: String!
    ): Auth
  }
`;

// export the typeDefs
module.exports = typeDefs;
