const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userService = {
    // Criar um novo usuário
    async createUser(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser = new User({ ...data, password: hashedPassword });
            await newUser.save();
            return newUser.toObject({ versionKey: false, getters: true });
        } catch (error) {
            throw error;
        }
    },

    // Obter todos os usuários
    async getAllUsers() {
        try {
            const users = await User.find().select('-password');
            return users;
        } catch (error) {
            throw error;
        }
    },

    // Obter um usuário pelo ID
    async getUserById(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            return user;
        } catch (error) {
            throw error;
        }
    },

    // Atualizar um usuário pelo ID
    async updateUser(userId, updateData) {
        try {
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
            return updatedUser;
        } catch (error) {
            throw error;
        }
    },

    // Deletar um usuário pelo ID
    async deleteUser(userId) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = userService;