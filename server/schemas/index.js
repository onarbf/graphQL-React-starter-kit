export default `
  type Query
  type Mutation
  type Error{
    path: String
    code: String
    message: String
  }
  type Response{
    success: String!
    errors: [Error]
  }
`;
