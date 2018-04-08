import gpl from 'graphql-tag';

export default {
  "query":{
    "getUsers": gpl`
      {
        getUsers{
          email
        }
      }
    `
  },
  "mutation":{
    "addUser" : gpl`
      mutation($email: String!, $password: String!, $verifyPassword: String!){
        addUser(email: $email, password: $password, verifyPassword: $verifyPassword){
          email
          password
          response{
            success
            errors{
              code
              path
              message
            }
          }
        }
      }
    `,
    "login" : gpl`
      mutation($email: String!, $password: String!){
        login(email: $email, password: $password){
          success
          errors{
            path
            message
            code
          }
        }
      }
    `
  }
  // subscription:{}
}
