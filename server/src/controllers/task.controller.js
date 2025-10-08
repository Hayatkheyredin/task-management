import { Task } from "../models/Task.model.js";
import { User } from "../models/User.model.js";
import { Op } from "sequelize";

export async function listTasks(req, res) {
	const { status, priority, dueFrom, dueTo, category, assignedTo } = req.query;
	
	try {
		const where = { 
			[Op.or]: [
				{ userId: req.user.id }, // Tasks owned by user
				{ assignedTo: req.user.id } // Tasks assigned to user
			]
		};
		
		if (status) where.status = status;
		if (priority) where.priority = priority;
		if (category) where.category = category;
		if (assignedTo) where.assignedTo = assignedTo;
		
		if (dueFrom || dueTo) {
			where.dueDate = {};
			if (dueFrom) where.dueDate[Op.gte] = new Date(dueFrom);
			if (dueTo) where.dueDate[Op.lte] = new Date(dueTo);
		}
		
		const tasks = await Task.findAll({
			where,
			include: [
				{ model: User, as: 'owner', attributes: ['id', 'name', 'email'] },
				{ model: User, as: 'assignee', attributes: ['id', 'name', 'email'] }
			],
			order: [['position', 'ASC'], ['updatedAt', 'DESC']]
		});
		
		return res.json({ tasks });
	} catch (error) {
		console.error("List tasks error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function createTask(req, res) {
	const { title, description, dueDate, priority, category, subtasks, assignedTo } = req.body;
	
	if (!title) {
		return res.status(400).json({ message: "Title is required" });
	}
	
	try {
		const task = await Task.create({
			title,
			description,
			dueDate: dueDate ? new Date(dueDate) : null,
			priority: priority || 'medium',
			category: category || 'General',
			subtasks: subtasks || [],
			userId: req.user.id,
			assignedTo: assignedTo || req.user.id // Default to current user if not assigned
		});
		
		return res.status(201).json({ task });
	} catch (error) {
		console.error("Create task error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function getTask(req, res) {
	try {
		const task = await Task.findOne({
			where: { id: req.params.id, userId: req.user.id }
		});
		
		if (!task) return res.status(404).json({ message: "Task not found" });
		
		return res.json({ task });
	} catch (error) {
		console.error("Get task error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateTask(req, res) {
	const { title, description, dueDate, priority, status, category, subtasks, assignedTo } = req.body;
	
	try {
		const task = await Task.findOne({
			where: { id: req.params.id, userId: req.user.id }
		});
		
		if (!task) return res.status(404).json({ message: "Task not found" });
		
		await task.update({
			title: title !== undefined ? title : task.title,
			description: description !== undefined ? description : task.description,
			dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : task.dueDate,
			priority: priority !== undefined ? priority : task.priority,
			status: status !== undefined ? status : task.status,
			category: category !== undefined ? category : task.category,
			subtasks: subtasks !== undefined ? subtasks : task.subtasks,
			assignedTo: assignedTo !== undefined ? assignedTo : task.assignedTo
		});
		
		return res.json({ task });
	} catch (error) {
		console.error("Update task error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function deleteTask(req, res) {
	try {
		const task = await Task.findOne({
			where: { id: req.params.id, userId: req.user.id }
		});
		
		if (!task) return res.status(404).json({ message: "Task not found" });
		
		await task.destroy();
		return res.status(204).end();
	} catch (error) {
		console.error("Delete task error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function reorderTasks(req, res) {
	const { orderedIds } = req.body;
	
	if (!Array.isArray(orderedIds)) {
		return res.status(400).json({ message: "orderedIds must be an array" });
	}
	
	try {
		// Update positions for each task
		for (let i = 0; i < orderedIds.length; i++) {
			await Task.update(
				{ position: i },
				{ where: { id: orderedIds[i], userId: req.user.id } }
			);
		}
		
		return res.json({ ok: true });
	} catch (error) {
		console.error("Reorder tasks error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}


