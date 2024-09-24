// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');
const {auth} = require('../middlewares/authenticateToken')
const sessionAuth = require('../middlewares/sessionLogin');
const { versionMiddleware } = require('../middlewares/version');
const cookieParser = require('cookie-parser');


const router = express.Router({ mergeParams: true });
const userController = new UserController();
const userValidator = new UserValidator();


router.get('/:id', auth, userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
router.get('/search', auth, (req, res) => userController.searchUsers(req, res));

router.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
router.post('/login', versionMiddleware("1.1.0"), express.json(), sessionAuth,  userValidator.validateUserLogin(), (req, res) => userController.verifyUser(req, res))
router.post('/login', versionMiddleware("1.0.0"), express.json(), cookieParser(), userValidator.validateUserLogin(), (req, res) => userController.verifyUserCookies(req, res))

router.put('/:id', auth, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));

router.delete('/:id', auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));

module.exports = router;