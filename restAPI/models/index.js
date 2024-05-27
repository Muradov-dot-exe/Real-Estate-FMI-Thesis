const Sequelize = require("sequelize");
const sequelize = require("../config/dbconnection");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./User")(sequelize, Sequelize);
db.role = require("./Role")(sequelize, Sequelize);
db.notification = require("./Notifications")(sequelize, Sequelize);
db.favorite = require("./Favorite")(sequelize, Sequelize);

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

db.user.hasMany(db.notification, { foreignKey: "userId", as: "notifications" });
db.notification.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.user.hasMany(db.favorite, { foreignKey: "userId", as: "favorites" });
db.favorite.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
