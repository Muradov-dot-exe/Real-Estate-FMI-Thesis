const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config.js");
const db = require("../models");

const User = db.user;
const Role = db.role;

const generateToken = (user) => {
  const expiresIn = 86400;
  return jwt.sign({ id: user.id }, config.secret, {
    expiresIn: expiresIn,
  });
};

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      Role.findOne({
        where: {
          name: "user",
        },
      }).then((role) => {
        if (role) {
          user.setRoles([role.id]).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        } else {
          res.status(500).send({ message: "User role not found." });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
    include: [
      {
        model: Role,
        as: "roles",
      },
    ],
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Invalid username or password." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid username or password.",
        });
      }

      const token = generateToken(user);

      req.session.token = token;
      req.session.userId = user.id;
      req.session.expiresIn = Date.now() + 86400000;
      req.session.username = user.username;
      req.session.email = user.email;

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => role.name),
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.clearCookie("token");
  res.clearCookie("accesstoken");
  res.status(200).send({ message: "Signout successful!" });
};
