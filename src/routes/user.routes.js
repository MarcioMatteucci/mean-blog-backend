const router = require('express').Router();

const userValidators = require('../validators/user.validators');
const authMiddleware = require('../middlewares/auth.middleware');
const UsersController = require('../controllers/users.controller');

// Obtener imagen de perfil del usuario logeado
router.get('/image', userValidators.getImageLoggedUser, authMiddleware.isAuth, UsersController.getImageLoggedUser);

// Actualizar imagen de perfil
router.patch('/', userValidators.updateUserImage, authMiddleware.isAuth, UsersController.updateUserImage);

// Cambiar la contraseña
router.patch('/changePassword', userValidators.changePassword, authMiddleware.isAuth, UsersController.changePassword);

module.exports = router;