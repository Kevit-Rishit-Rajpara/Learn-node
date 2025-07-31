const mongoose = require("mongoose");

const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




exports.createUser = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(
      (user) => {
        console.log(user)
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Email already exists",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            }
            else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created successfully",
                    createdUser: user.email,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({
                    error: error,
                  });
                });
            }
          })
        }
      }) .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error,
        });
      });
    
  }

  exports.loginUser = (req, res, next) => { 
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'Auth failed'
            });
          }
          if (result) {
            const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id
            }, 'secret', {
              expiresIn: "1h"
            })
            return res.status(200).json({
              message: 'Auth successful',
              user: user[0].email,
              token:token
            });
          }
          res.status(401).json({
            message: 'Auth failed'
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  exports.deleteUser = (req, res, next) => {
      User.deleteOne({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'User deleted',
          result: result
        });
      })
      .catch(err => {
        console.log('67',err);
        res.status(500).json({
          error: err
        });
      });
  }