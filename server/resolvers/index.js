import auth from '../utils/auth';
import {isAuthenticatedResolver} from '../utils/permissions';
import ErrorResolver from '../utils/errorResolver.js';
export default {
  Query: {
    getUsers:  isAuthenticatedResolver.createResolver(
      (parent, args, context) => context.models.User.find()
    )
  },
  Mutation: {
    addUser: async (_, {email, password, verifyPassword}, context)=>{
        const errorResolver = new ErrorResolver();

        try {
          if (!email) {
            errorResolver.pushError(1)
          }
          if (!password) {
            errorResolver.pushError(2)
          }
          if (!verifyPassword) {
            errorResolver.pushError(3)
          }
          console.log('worked');
          const newUser = await context.models.User.create({email: email, password: password})
          console.log('new User created', newUser);
          errorResolver.checkErrors();
          return newUser;

        } catch (e) {
          console.log('errorino',e);
          return errorResolver.formatErrors(e);
        }
    },
    login: (_, args, context)=>auth.login(_,args,context)
  }
};
