const router = require('express').Router();

const userValidators = require('../validators/user.validators');
const authMiddleware = require('../middlewares/auth.middleware');
const UsersController = require('../controllers/users.controller');

router.get('/image', userValidators.getImageLoggedUser, authMiddleware.isAuth, UsersController.getImageLoggedUser);

router.patch('/', userValidators.updateUserImage, authMiddleware.isAuth, UsersController.updateUserImage);

router.patch('/changePassword', userValidators.changePassword, authMiddleware.isAuth, UsersController.changePassword);

module.exports = router;