export default `
  type Query {
    getUsers: [User]
  }
  type Mutation {
    addUser(email: String!, password: String!, verifyPassword: String!): User
    login(email: String!, password: String!): Response
  }
  type Error{
    path: String
    code: String
    message: String
  }
  type Response{
    success: String!
    errors: [Error]
  }
  type User {
    user: String
    email: String
    password: String
    token: String
    response: Response
  }
`;
