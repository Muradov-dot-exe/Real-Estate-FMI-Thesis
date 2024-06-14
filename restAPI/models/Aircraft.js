const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnection");

const Aircraft = sequelize.define("Aircraft", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  aircraft_type: { type: DataTypes.STRING, allowNull: false },
  manufacturer: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  registration_number: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  serial_number: { type: DataTypes.STRING, allowNull: false },
  seats: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Aircraft;
