const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;


// const multer = require('multer');
// const upload = multer({
//    dest: 'images/'
// })

// app.post('/upload', upload.single('avatar'), (req, res) => {
//    console.log("Called");
//    console.log(req.file, req.body)
//    res.send();
// });

// app.use((req, res, next) => {
//    res.status(503).send("Maintenance Mode");
// });

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);

app.get('/', (req, res) => {
   res.send("Home Page : Hello World");
 });

app.listen(port, () => {
   console.log("Port is listening on " + port);
});

// const bcrypt = require('bcryptjs')

// const fun = async () => {
//    // var password = "Abc";
//    // console.log(password, await bcrypt.hash(password, 1));
//    // console.log(password, await bcrypt.hash(password, 8));
//    const password = "Test@1234567";
//    console.log(password, await bcrypt.hash(password, 8));

//    console.log(await bcrypt.compare("Test@1234567", "$2a$08$S4whkqg4RtIo8Uwbj85oSekfhbXBrekWPbJJaAAnwj1oFPEQ8MfUW"))
// }

// fun();

// const main = async () => {
//    // const task = await Task.findById('6400707a27b08329c839c606');
//    // await task.populate("owner");
//    // console.log(task);

//    const user = await User.findById('64006bc338095ed4dc5b2b3d');
//    await user.populate('tasks');
//    console.log(user.tasks.length);
// } 

// main();
