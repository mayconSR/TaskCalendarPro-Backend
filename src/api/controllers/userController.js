const userService = require('../services/userServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email);
    
            if (!user) {
                return res.status(400).json({ message: 'Usuário não encontrado.' });
            }
    
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Senha inválida.' });
            }
    
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 3600000 });
            res.status(200).json({ message: 'Login bem sucedido' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao fazer login. ' + error.message });
        }
    }

};

module.exports = userController;
