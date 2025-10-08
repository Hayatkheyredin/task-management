import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  settings: {
    type: DataTypes.JSON,
    defaultValue: {
      notificationsEnabled: true,
      theme: "light",
    },
  },
}, {
  timestamps: true,
});

// Instance method for password comparison
User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export { User };


