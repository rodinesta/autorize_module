const Router = require('express')
const router = new Router()
const { signUpValidator } = require('../validators/userValidator')
const userController = require('../controllers/userController')

router.post('/signUp', signUpValidator, userController.signUp)
router.post('/login', userController.login)
router.get('/activate/:link', userController.activate)

module.exports = router