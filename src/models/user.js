const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error("Email is Invalid");
         }
      },
   },
   password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
         if (value.toLowerCase().includes("password")) {
            throw new Error('password cannot contains "password"');
         }
         if (!validator.isLength(value.trim(), { min: 6 })) {
            throw new Error("User password must be greater than 6 letter");
         }
      },
   },
   age: {
      type: Number,
      default: 0,
      validate(value) {
         if (value < 0) {
            throw new Error("Age must be Positive Number");
         }
      },
   },
   tokens: [{
      token: {
         type: String,
         required: true
      }
   }],
   avatar: {
      type: Buffer
   }
},
{
   timestamps: true
});

userSchema.virtual('tasks', {
   ref: 'Task',
   localField: '_id',
   foreignField: 'owner'
})

userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email });
   
   if (!user) {
      throw new Error("Unable to Login...");
   }

   const ismatched = await bcrypt.compare(password, user.password);
   
   if (!ismatched) {
      throw new Error("Unable to Login...");
   }

   return user;
};

//call from instances
userSchema.methods.generateAuthToken = async function () {
   const user = this;
   
   const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_SECRET);

   user.tokens = user.tokens.concat({token});
   await user.save();

   return token;
};

userSchema.methods.toJSON = function (){
   const user = this;
   const userObject = user.toObject();

   delete userObject.password;
   delete userObject.tokens;
   delete userObject.avatar;

   return userObject;
}

// userSchema.methods.getPublicProfile = function (){
//    const user = this;
//    const userObject = user.toObject();

//    delete userObject.password;
//    delete userObject.tokens;

//    return userObject;
// }


userSchema.pre("save", async function (next) {
   const user = this;
   if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
   }

   next();
});

///SKIP
userSchema.pre('remove', function() { console.log('Removing!'); });

// userSchema.pre("remove", { document: true, query: true }, async function (next) {
//    const user = this;
//    console.log('called');
//    await Task.deleteMany({ owner: user._id });

//    next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
