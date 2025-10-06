import mongoose from "mongoose";

const SubtaskSchema = new mongoose.Schema(
	{
		id: { type: String, required: true },
		title: { type: String, required: true },
		completed: { type: Boolean, default: false },
		position: { type: Number, default: 0 },
	},
	{ _id: false }
);

const TaskSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
		title: { type: String, required: true },
		description: { type: String },
		dueDate: { type: Date },
		priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
		status: { type: String, enum: ["todo", "in_progress", "done"], default: "todo" },
		category: { type: String, default: "General" },
		subtasks: { type: [SubtaskSchema], default: [] },
		position: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);


