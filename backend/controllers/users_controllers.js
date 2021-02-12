const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users_schema");
const multer = require("multer");
const path = require("path");
const upload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

//@route POST
//@desc: Registering new users
router.post("/register_users", async (req, res) => {
  //get user data from frontend
  const { name, surname, email, password } = req.body;

  try {
    //register new user
    const newUser = new Users({
      _id: mongoose.Types.ObjectId(),
      name: name,
      surname: surname,
      email: email,
      password: password,
    });

    //check if user already exists
    userFound = await Users.findOne({ email: email });
    if (userFound) {
      return res.status(201).json({
        message: "Registration failed, user already exists.",
      });
    } else {
      //save new user
      newUser.save((err) => {
        if (err) {
          return console.log(err);
        } else {
          res.status(201).json({
            message: "Successfully registered, Please sign in.",
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to save new user",
      err: error,
    });
  }
});

//login
//validate login/ user data from front end
router.post("/login_users", async (req, res) => {
  Users.find({ email: req.body.email, password: req.body.password })
  .select(' _id name surname skills email age location phoneNumber image video')
    .exec()
    .then((users) => {
      if (users.length < 1) {
        return res.json({
          message: "Login error! Please check your details",
        });
      } else {
        return res.json({
          message: "Logged In Successfully!",
          users: users,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});

//Get all users from database
router.get("/get_all_users", (req, res, next) => {
  Users.find()
  .select(' _id name surname skills email age location phoneNumber image video')
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});


//Updating a user
router.patch("/update_users/:id", async (req, res) => {
  try {

    const users = await Users.findOne({ _id: req.params.id });

    if (req.body.name) {
      users.name = req.body.name;
    }

    if (req.body.surname) {
      users.surname = req.body.surname;
    }

    if (req.body.email) {
      users.email = req.body.email;
    }
    if (req.body.password) {
      users.password = req.body.password;
    }

    if (req.body.location) {
      users.location = req.body.location;
    }

    if (req.body.skills) {
      users.skills = req.body.skills;
    }

    if (req.body.age) {
      users.age = req.body.age;
    }

    if (req.body.phoneNumber) {
      users.phoneNumber = req.body.phoneNumber;
    }

  await users.save();
  return res.send({
    message: "Profile successfully updated!",
    users
  });
} catch {
  return res.status(404).send({ error: "User doesn't exist!" });
}
});

//getting a user by id
router.get("/get_user/:userId", (req, res, next) => {
  Users.find({ _id: req.params.userId })
  .select(' _id name surname skills email age location phoneNumber image video')
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          users: doc,
        });
      } else if (!_id)
      {
        res.status(404).json({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ 
        message:"User does not exist",
        error: err 
      });
    });
});

//User image upload
router.patch("/update_image/:id", async (req, res) => {
  try {
    const users = await Users.findOne({ _id: req.params.id });

    if (req.files.image) {
    
      const image = req.files.image;
      const fileName = image.name;
      const size = image.data.length;
      const extension = path.extname(fileName);
      const allowedExtensions = /png|jpeg|jpg|gif/;

      if (!allowedExtensions.test(extension)) throw "Unsupported extension!";
      if (size > 5000000) throw "File must be less than 5MB";


      const myFileName = uuidv4() + extension;
      util.promisify(image.mv)("./public/uploads/" + myFileName);  
      
     users.image = myFileName;
  }

  await users.save();
  return res.send({
    message: "Image successfully uploaded!",
    users
  });
} catch {
  return res.status(404).send({ error: "User doesn't exist!" });
}
});


//User video upload
router.patch("/update_video/:id", async (req, res) => {
  try {
    const users = await Users.findOne({ _id: req.params.id });

    if (req.files.video) {
    
      const video = req.files.video;
      const fileName = video.name;
      const size = video.data.length;
      const extension = path.extname(fileName);
      const allowedExtensions = /mp4|gif/;
  
      if (!allowedExtensions.test(extension)) throw "Unsupported extension!";
      if (size > 100000000) throw "File must be less than 100MB";
      
      const myFileName = uuidv4() + extension;
      util.promisify(video.mv)("./public/uploads/" + myFileName);  
      
     users.video = myFileName;
  }
    await users.save();
    return res.send({
      message: "Video successfully updated!",
      users
    });
  } catch {
    return res.status(404).send({ error: "User doesn't exist!" });
  }
});


module.exports = router;
