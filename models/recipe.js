const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    //ingredients and instructions into arrays for listing later
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        // Get the stringified array value from the database
        const value = this.getDataValue("ingredients");
        if (!value) {
          //invalid value= empty array
          return [];
        }
        return JSON.parse(value);
      },
      set(value) {
        //convert the array into a string for storage in db
        this.setDataValue("ingredients", JSON.stringify(value));
      },
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        // Get the stringified array value from the database
        const value = this.getDataValue("instructions");
        if (!value) {
          //invalid value= empty array
          return [];
        }
        return JSON.parse(value);
      },
      set(value) {
        //convert the array into a string for storage in db
        this.setDataValue("instructions", JSON.stringify(value));
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ratings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Recipe",
  }
);

module.exports = Recipe;
