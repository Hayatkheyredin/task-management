import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";
import { User } from "./User.model.js";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
  },
  status: {
    type: DataTypes.ENUM('todo', 'in_progress', 'done'),
    defaultValue: 'todo',
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'General',
  },
  subtasks: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

// Define associations
Task.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });
User.hasMany(Task, { foreignKey: 'userId', as: 'ownedTasks' });
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });

export { Task };


