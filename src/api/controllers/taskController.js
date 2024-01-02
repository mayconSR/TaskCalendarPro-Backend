const Task = require('../models/Task');
const taskService = require('../services/taskServices');

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
    try {
        const newTask = await taskService.createTask({ ...req.body, user: req.user.id });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ler todas as tarefas do usuário
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasksByUser(req.user.id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ler uma tarefa específica pelo ID, verificando se pertence ao usuário
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar uma tarefa específica pelo ID, verificando se pertence ao usuário
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Deletar uma tarefa específica pelo ID, verificando se pertence ao usuário
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
        res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
