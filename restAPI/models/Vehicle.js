const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnection");

const Vehicle = sequelize.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vehicle_type: { type: DataTypes.STRING, allowNull: false },
  manufacturer: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  VIN: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  seats: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Vehicle;
