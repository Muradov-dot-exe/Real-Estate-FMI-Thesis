const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnection");

const Property = sequelize.define("Property", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  area: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  floorspace: { type: DataTypes.FLOAT, allowNull: false },
  beds: { type: DataTypes.INTEGER, allowNull: false },
  baths: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  parking: { type: DataTypes.INTEGER, allowNull: false },
  construction: { type: DataTypes.STRING, allowNull: false },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Property;
