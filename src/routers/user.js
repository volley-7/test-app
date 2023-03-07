const express = require("express");
const multer = require("multer");

const sharp = require("sharp");

const User = require("../models/user");
const router = new express.Router();

const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
   var user = new User(req.body);

   try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
   } catch (e) {
      console.log(e);
      res.status(400).send(e);
   }

   // user.save()
   //    .then(() => {
   //       res.status(201).send(user);
   //    })
   //    .catch((error) => {
   //       res.status(400).send(error);
   //    });
});

router.post("/users/login", async (req, res) => {
   try {
      const user = await User.findByCredentials(
         req.body.email,
         req.body.password
      );
      const token = await user.generateAuthToken();

      res.send({ user, token });
   } catch (e) {
      console.log(e);
      res.status(400).send();
   }
});

router.post("/users/logout", auth, async (req, res) => {
   try {
      req.user.tokens = req.user.tokens.filter((tok) => {
         return tok.token != req.token;
      });

      await req.user.save();

      res.send();
   } catch (e) {
      res.status(500).send();
   }
});

router.post("/users/logoutall", auth, async (req, res) => {
   try {
      req.user.tokens = [];
      await req.user.save();

      res.send();
   } catch (e) {
      res.status(500).send();
   }
});

router.get("/users/me", auth, async (req, res) => {
   res.send(req.user);
   // try {
   //    const users = await User.find({});
   //    res.send(users);
   // } catch (e) {
   //    res.status(500).send(e);
   // }

   // User.find({})
   //    .then((users) => {
   //       res.send(users);
   //    })
   //    .catch((error) => {
   //       res.status(500).send(error);
   //    });
});

router.get("/users/:id", async (req, res) => {
   const _id = req.params.id;

   try {
      const user = await User.findById(_id);

      if (!user) {
         return res.status(404).send();
      }

      res.send(user);
   } catch (e) {
      res.status(500).send(e);
   }

   // User.findById(_id)
   //    .then((user) => {
   //       if (!user) {
   //          return res.status(404).send();
   //       }

   //       res.send(user);
   //    })
   //    .catch((error) => {
   //       res.status(500).send(error);
   //    });
});

router.patch("/users/me", auth, async (req, res) => {
   const update = Object.keys(req.body);
   const allowdUpdates = ["name", "email", "password", "age"];

   const isValidOperation = update.every((update) => {
      return allowdUpdates.includes(update);
   });

   if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Updates" });
   }

   try {
      update.forEach((temp) => {
         req.user[temp] = req.body[temp];
      });

      await req.user.save();

      res.send(req.user);
   } catch (e) {
      res.status(400).send(e);
   }

   // try {
   //    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
   //    //    new: true,
   //    //    runValidators: true,
   //    // });

   //    const user = await User.findById(req.params.id);

   //    if (!user) {
   //       return res.status(404).send();
   //    }

   //    update.forEach((temp) => {
   //       user[temp] = req.body[temp];
   //    });

   //    await user.save();

   //    res.send(user);
   // } catch (e) {
   //    res.status(400).send(e);
   // }
});

router.delete("/users/me", auth, async (req, res) => {
   try {
      // const user = await User.findByIdAndDelete(req.params.id);

      // if (!user) {
      //    return res.status(404).send();
      // }
      //console.log(req.user);
      await req.user.deleteOne();
      res.send(req.user);
   } catch (e) {
      console.log(e);
      res.status(500).send(e);
   }
});

const avatar = multer({
   limits: {
      fileSize: 1000000,
   },
   fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
         return cb("Please upload jpg, jpeg, png image.");
      }

      cb(undefined, true);
   },
});

router.post(
   "/users/me/avatar",
   auth,
   avatar.single("avatar"),
   async (req, res) => {
      //req.user.avatar = req.file.buffer;

      var buffer = await sharp(req.file.buffer)
         .resize({ width: 100, height: 100 })
         .png()
         .toBuffer();

      req.user.avatar = buffer;

      await req.user.save();
      res.send();
   },
   (error, req, res, next) => {
      console.log(error);
      res.status(400).send({ error });
   }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
   req.user.avatar = undefined;
   await req.user.save();
   res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
   try {
      var user = await User.findById(req.params.id);

      if (!user || !user.avatar) {
         return res.status(404).send();
      }

      res.set("Content-Type", "image/jpeg");
      res.send(user.avatar);
   } catch (e) {
      res.status(400).send();
   }
});

module.exports = router;
