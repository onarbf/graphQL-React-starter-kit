import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const emailValidator = [
  validate({
    validator: 'isEmail',
    passIfEmpty: true,
    message: 'el Email no es un email',
  })
]

var userSchema = mongoose.Schema({
  email : {
    type: String,
    unique: true,
    required: true,
    validate: emailValidator
  },
  password : {
    type: String,
    unique:false,
    required: true
  },
  username: String,
  description: String,
  thumbnail: String,
  createdAt : {
    type: String,
    default: new Date
  }
})

const UserModel = mongoose.model('User',userSchema );

export default UserModel;
