const userService = require('../services/userServices');

const userController = {
    // Criar um novo usuário
    async create(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json({ user: newUser });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar usuário. ' + error.message });
        }
    },

    // Obter todos os usuários
    async getAll(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuários. ' + error.message });
        }
    },

    // Obter um usuário pelo ID
    async getById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuário. ' + error.message });
        }
    },

    // Atualizar um usuário pelo ID
    async update(req, res) {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar usuário. ' + error.message });
        }
    },

    // Deletar um usuário pelo ID
    async delete(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(200).json({ message: 'Usuário deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar usuário. ' + error.message });
        }
    }
};

module.exports = userController;
