const express = require("express");
const db = require("../Connection/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res, next) => {
    try {
      let user = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hash(req.body.password, 8),
        phonenumber: req.body.phonenumber,
        role: req.body.role,
      };

      bcrypt
        .hash(req.body.password, 8)
        .then((hash) => {
          user.password = hash;
        })
        .then(() => {
          let sql = "INSERT INTO users SET ?";
          db.query(sql, user, (err, result) => {
            if (err) {
              res
                .status(400)
                .send({ status: false, message: "Error registering the user" });
            }
            db.query(
              `SELECT * FROM users WHERE email = ?`,
              user.email,
              (err, resp) => {
                if (err) {
                  res.send({ error: err });
                }
                res.status(200).send({
                  status: true,
                  message: "user registered successfully",
                  data: resp,
                });
              }
            );
          });
        });
    } catch (error) {
      console.log("err", error);
    }
  },
  login: (req, res, next) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let sql = "SELECT * from users WHERE email = ?";
      db.query(sql, email, (err, result) => {
        if (err) {
          res.status(400).send({ status: false, message: "error" });
        }
        if (result.length === 0) {
          res.status(400).send({ status: false, message: "user not found" });
        }

        bcrypt.compare(password, result[0].password).then((isMatch) => {
          if (isMatch === false) {
            return res.status(401).send({
              message: "email or Password is incorrect ",
            });
          }
          //   generate token
          const token = jwt.sign(
            { id: result[0].user_id.toString() },
            process.env.SECRET_KEY
          );
          return res.status(200).send({
            message: "Logged in successfully",
            user: result[0],
            token,
          });
        });
      });
    } catch (error) {
      console.log("error", error);
    }
  },
};
