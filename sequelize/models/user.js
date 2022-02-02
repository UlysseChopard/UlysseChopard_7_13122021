"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { as: "posts", foreignKey: "userId" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4,
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User firstname must not be empty",
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User lastname must not be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "User must provide an email",
          },
          notEmpty: {
            msg: "User email cannot be empty",
          },
          is: {
            args: /@groupomania.com$/,
            msg: "User email must end with @groupomania.com",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [[6, 12]],
            msg: "User password must contain at least 6 characters, and be under 12",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
