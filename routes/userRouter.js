const Router = require('express')
const router = new Router()
const { signUpValidator } = require('../validators/userValidator')
const userController = require('../controllers/userController')
const { sign } = require('jsonwebtoken')

router.post('/signUp', signUpValidator, userController.signUp)
router.post('/login', userController.login)

module.exports = router