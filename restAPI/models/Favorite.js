const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnection");

const Favorite = sequelize.define("Favorite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  offerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = () => Favorite;
