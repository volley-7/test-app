const express = require('express');

const auth = require('../middleware/auth');
const Task = require('../models/task');

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
   var task = new Task({
      ...req.body,
      owner: req.user._id
   });

   try {
      await task.save();
      await task.populate('owner');
      res.status(201).send(task);
   } catch (e) {
      res.status(400).send(e);
   }

   // task
   //    .save()
   //    .then(() => {
   //       res.status(201).send(task);
   //    })
   //    .catch((error) => {
   //       res.status(400).send(error);
   //    });
});

router.get("/tasks", auth, async (req, res) => {
   try {
      const match = {};
      const sort = {};

      if(req.query.completed){
         match.completed = req.query.completed === 'true'
      }

      if(req.query.sortBy){
         const part = req.query.sortBy.split(':');
         sort[part[0]] = part[1] === 'desc' ? -1 : 1
      }

      console.log(match);
      console.log(sort);

      await req.user.populate({
         path: 'tasks',
         match,
         options :{
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
         }
      });
      res.send(req.user.tasks);
   } catch (e) {
      res.status(500).send(e);
   }
});

// router.get("/tasks", auth, async (req, res) => {
//    try {
//       const tasks = await Task.find({ owner: req.user._id });

//       res.send(tasks);

//       // await req.user.populate('tasks');
//       // res.send(req.user.tasks);
//    } catch (e) {
//       res.status(500).send(e);
//    }

//    // Task.find({})
//    //    .then((tasks) => {
//    //       res.send(tasks);
//    //    })
//    //    .catch((error) => {
//    //       res.status(500).send(error);
//    //    });
// });

router.get("/tasks/:id", auth, async (req, res) => {
   const _id = req.params.id;

   try {
      //const task = await Task.findById(_id);
      const task = await Task.findOne({ _id, owner: req.user._id });

      if (!task) {
         return res.status(404).send();
      }

      res.send(task);
   } catch (e) {
      res.status(500).send(e);
   }

   // Task.findById(_id)
   //    .then((task) => {
   //       if (!task) {
   //          return res.status(404).send();
   //       }

   //       res.send(task);
   //    })
   //    .catch((error) => {
   //       res.status(500).send(error);
   //    });
});

router.patch("/tasks/:id", auth,async (req, res) => {
   const update = Object.keys(req.body);
   const allowdUpdates = ["description", "completed"];

   const isValidOperation = update.every((update) => {
      return allowdUpdates.includes(update);
   });

   if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Updates" });
   }

   try {
      // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      //    new: true,
      //    runValidators: true,
      // });

      //const task = await Task.findById(req.params.id);
      const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

      if (!task) {
         return res.status(404).send();
      }

      update.forEach((temp) => {
         task[temp] = req.body[temp];
      })

      await task.save();

      res.send(task);
   } catch (e) {
      res.status(400).send(e);
   }
});

router.delete("/tasks/:id", auth, async (req, res) => {
   try {
      //const task = await Task.findByIdAndDelete(req.params.id);
      const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

      if (!task) {
         return res.status(404).send();
      }

      res.send(task);
   } catch (e) {
      res.status(500).send(e);
   }
});

module.exports = router;