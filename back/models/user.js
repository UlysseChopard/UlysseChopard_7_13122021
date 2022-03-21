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
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        salt: undefined,
      };
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
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "User password must be provided",
          },
          len: {
            args: [8, 64],
            msg: "User password should be between 8 and 64 characters",
          },
        },
      },
      salt: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password salt missing",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("user", "moderator", "admin"),
        defaultValue: "user",
        validate: {
          isIn: {
            args: [["user", "moderator", "admin"]],
            msg: "This role does not exist",
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
