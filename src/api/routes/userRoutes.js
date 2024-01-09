const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', userController.create);
router.post('/login', userController.login);
router.get('/', authMiddleware, userController.getAll); 
router.get('/:id', authMiddleware, userController.getById); 
router.put('/:id', authMiddleware, userController.update); 
router.delete('/:id', authMiddleware, userController.delete); 

module.exports = router;
