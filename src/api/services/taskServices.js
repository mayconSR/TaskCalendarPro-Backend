const Task = require('../models/Task'); 

const taskService = {
    // Criar uma nova tarefa
    async createTask(data) {
        try {
            const newTask = new Task(data);
            await newTask.save();
            return newTask;
        } catch (error) {
            throw error;
        }
    },

    // Obter todas as tarefas de um usuário
    async getAllTasksByUser(userId) {
        try {
            const tasks = await Task.find({ user: userId });
            return tasks;
        } catch (error) {
            throw error;
        }
    },

    // Obter uma tarefa pelo ID, verificando o usuário
    async getTaskById(taskId, userId) {
        try {
            const task = await Task.findOne({ _id: taskId, user: userId });
            return task;
        } catch (error) {
            throw error;
        }
    },

    // Atualizar uma tarefa pelo ID, verificando o usuário
    async updateTask(taskId, userId, updateData) {
        try {
            const updatedTask = await Task.findOneAndUpdate({ _id: taskId, user: userId }, updateData, { new: true });
            return updatedTask;
        } catch (error) {
            throw error;
        }
    },

    // Deletar uma tarefa pelo ID, verificando o usuário
    async deleteTask(taskId, userId) {
        try {
            const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: userId });
            return deletedTask;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = taskService;
