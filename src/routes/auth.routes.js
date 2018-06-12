const router = require('express').Router();

const authValidators = require('../validators/auth.validators');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');

router.post('/signUp', authValidators.signUp, authController.signUp);

router.post('/signIn', authValidators.signIn, authController.signIn);

router.get('/refreshToken', authValidators.refreshToken, authMiddleware.isAuth, authController.refreshToken);

router.get('/checkUsername', authValidators.checkUsername, authController.checkUsername);

router.get('/checkEmail', authValidators.checkEmail, authController.checkEmail);

module.exports = router;