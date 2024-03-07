import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },
    
    password : {
        type : String,
        required : true
    },
    lastName: {
        type: String,
        default: 'lastName',
      },
      location: {
        type: String,
        default: 'my city',
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
      avatar: String,
      avatarId : String,
      

    
});


userSchema.methods.toJSON = function(){

  const obj = this.toObject();
  delete obj.password;
  return obj;
}

export default mongoose.model('User', userSchema);
