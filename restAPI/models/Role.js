const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnection");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = () => Role;
