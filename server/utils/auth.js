import jwt from 'jsonwebtoken';
import models from '../models';
const SECRET = 'supersecret';

const auth = {
  checkAuth: async (req,res,next)=>{
    const token = req.headers['x-token'];
    if(token !== 'null'){
      try {
        const isAuth = await jwt.verify(token,SECRET);
        req.user = isAuth.user;
      } catch (e) {
        console.log('e',e.message);

        try {
          var userID = null;
          let ress = await jwt.decode(token);
          // req.user = user;
          const user =ress.user;
          userID = user;
        } catch (e) {
          console.log('e2',e.message);
        }

        if (userID) {
          const user = await models.User.findOne({_id:userID});
          if (user) {
            let newToken = await auth.createToken(user._id)
            console.log('new Token', newToken);
            req.user = user._id;
            res.set('Access-Control-Expose-Headers','x-token')
            res.set('x-token',newToken)
          }
        }
      }
    }
    next();
  },
  createToken : async (userID)=>{
    let newToken = await jwt.sign({user: userID}, SECRET,{expiresIn: '10s'});
    return newToken;
  },
  login: async (_, args, context)=>{
      throw Error('error')
  }
}

export default auth;

//
// const user = await models.User.findOne({email: args.email});
// if(!user){
//   return errors.formatErrors("1",'email','email inválido');
// }
// const validPassword = (user.password === args.password)
// if(!validPassword){
//   return errors.formatErrors("2",'password','password inválido');
// }
// console.log('they passed nearly here');
// try {
//   const token = await auth.createToken(user._id);
//   if (token) {
//     res.set('x-token', token);
//     return {
//       success : 'Usuario validado',
//       errors : []
//     }
//   }
// } catch (e) {
//   console.log('error loggin', e.message);
//   return errors.formatErrors("3",'unknownError',e.message);
// }
