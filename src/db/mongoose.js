const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
//const validator = require('validator');

const Task = require("../models/task");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

// const User = mongoose.model("User", {
//    name: {
//       type: String,
//       required: true,
//       trim: true
//    },
//    email:{
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//       validate(value){
//          if(!validator.isEmail(value)){
//             throw new Error('Email is Invalid');
//          }
//       }
//    },
//    password:{
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//       validate(value){
//          if(value.toLowerCase().includes('password')){
//             throw new Error('password cannot contains "password"');
//          }
//          if(!validator.isLength(value.trim(),{ min: 6 })){
//             throw new Error('User password must be greater than 6 letter');
//          }
//       }
//    },
//    age: {
//       type: Number,
//       default: 0,
//       validate(value){
//          if(value < 0){
//             throw new Error('Age must be Positive Number');
//          }
//       }
//    },
// });

// const me = new User({
//    name: "          ABC 123              ",
//    email: 'ABC123@gmail.com',
//    password: 'P@ssw0rd'
// });

// // me.save()
// //    .then(() => {
// //       console.log(me);
// //    })
// //    .catch((error) => {
// //       console.log(error);
// //    });

// const Task = mongoose.model("Task", {
//    description: {
//       type: String,
//       required: true,
//       trim: true
//    },
//    completed: {
//       type: Boolean,
//       default: false
//    },
// });

// const dummyTask = new Task({
//    description: "            Task 19456456              ",
// })

// dummyTask.save()
//    .then(() => {
//       console.log(dummyTask);
//    })
//    .catch((error) => {
//       console.log(error);
//    });

// Task.findByIdAndRemove({ _id: new ObjectId("63fdd03b47e14a4310e484e2") })
//    .then((task) => {
//       console.log(task);
//       console.log("--------------------");
//       return Task.countDocuments({ completed: false })
//    })
//    .then((tasks) => {
//       console.log(tasks);
//    })
//    .catch((e) => {
//       console.log(e);
//    });

// const DeleteTaskByIdAndGetCount = async (_id) => {
//    const task = await Task.findByIdAndRemove({ _id });
//    const count = await Task.countDocuments({ completed: false });
//    return count;
// };

// DeleteTaskByIdAndGetCount("63fdd03b47e14a4310e484e2")
//    .then((result) => {
//       console.log(result);
//    })
//    .catch((e) => {
//       console.log(e);
//    });
