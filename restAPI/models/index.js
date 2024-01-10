// const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("real_estate_db", "root", "pass123", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/User")(sequelize, Sequelize);
db.role = require("../models/Role")(sequelize, Sequelize);
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
  as: "users",
});
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
