exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const cookie = require("cookie"); // Import the 'cookie' module

exports.userInfo = (req, res) => {
  const userId = req.session.userId;
  req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;

  User.findByPk(userId, {
    attributes: ["id", "username", "email"],
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found." });
      }

      // Generate a new JWT token
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      // Set the token as an HttpOnly cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        })
      );

      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
