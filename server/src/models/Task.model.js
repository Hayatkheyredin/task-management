import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [1, "Title must be at least 1 character"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
    default: ""
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"]
  },
  priority: {
    type: String,
    enum: {
      values: ["low", "medium", "high", "urgent"],
      message: "Priority must be low, medium, high, or urgent"
    },
    default: "medium"
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "completed", "cancelled"],
      message: "Status must be pending, in-progress, completed, or cancelled"
    },
    default: "pending"
  },
  completedAt: {
    type: Date,
    default: null
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, "Tag cannot exceed 20 characters"]
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, dueDate: 1 });
taskSchema.index({ user: 1, priority: 1 });

// Virtual for checking if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  return this.dueDate < new Date() && this.status !== 'completed';
});

// Method to mark task as completed
taskSchema.methods.markCompleted = function() {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

// Method to mark task as in progress
taskSchema.methods.markInProgress = function() {
  this.status = 'in-progress';
  this.completedAt = null;
  return this.save();
};

// Method to mark task as pending
taskSchema.methods.markPending = function() {
  this.status = 'pending';
  this.completedAt = null;
  return this.save();
};

// Static method to get tasks by user with filtering
taskSchema.statics.getUserTasks = function(userId, filters = {}) {
  const query = { user: userId };
  
  if (filters.status) {
    query.status = filters.status;
  }
  
  if (filters.priority) {
    query.priority = filters.priority;
  }
  
  if (filters.dueDate) {
    const date = new Date(filters.dueDate);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    query.dueDate = {
      $gte: date,
      $lt: nextDay
    };
  }
  
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }
  
  return this.find(query).sort({ dueDate: 1, priority: -1 });
};

const Task = mongoose.model('Task', taskSchema);

export { Task };