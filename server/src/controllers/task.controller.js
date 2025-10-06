import { Task } from "../models/Task.model.js";

export async function listTasks(req, res) {
	const { status, priority, dueFrom, dueTo, category } = req.query;
	const query = { userId: req.user.id };
	if (status) query.status = status;
	if (priority) query.priority = priority;
	if (category) query.category = category;
	if (dueFrom || dueTo) query.dueDate = {};
	if (dueFrom) query.dueDate.$gte = new Date(dueFrom);
	if (dueTo) query.dueDate.$lte = new Date(dueTo);
	const tasks = await Task.find(query).sort({ position: 1, updatedAt: -1 });
	return res.json({ tasks });
}

export async function createTask(req, res) {
	const data = req.body;
	const task = await Task.create({ ...data, userId: req.user.id });
	return res.status(201).json({ task });
}

export async function getTask(req, res) {
	const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
	if (!task) return res.status(404).json({ message: "Not found" });
	return res.json({ task });
}

export async function updateTask(req, res) {
	const updates = req.body;
	const task = await Task.findOneAndUpdate(
		{ _id: req.params.id, userId: req.user.id },
		{ $set: updates },
		{ new: true }
	);
	if (!task) return res.status(404).json({ message: "Not found" });
	return res.json({ task });
}

export async function deleteTask(req, res) {
	await Task.deleteOne({ _id: req.params.id, userId: req.user.id });
	return res.status(204).end();
}

export async function reorderTasks(req, res) {
	const { orderedIds } = req.body; // array of task ids in new order
	if (!Array.isArray(orderedIds)) return res.status(400).json({ message: "orderedIds must be an array" });
	const bulk = orderedIds.map((id, index) => ({
		updateOne: { filter: { _id: id, userId: req.user.id }, update: { $set: { position: index } } },
	}));
	await Task.bulkWrite(bulk);
	return res.json({ ok: true });
}


