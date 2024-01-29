const { validationResult } = require('express-validator');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJwt = (id, username) => {
    return jwt.sign(
        { id, username },
        process.env.SECRET_KEY,
        { expiresIn: '30d' }
    );
};

class UserController {
    async signUp(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().map(error => `${error.msg}`).join(', ')
                return next(ApiError.badRequest(`Ошибка при валидации: ${errorMessage}`))
            }

            const { name, surname, middlename, email, username, password } = req.body;

            const candidate = await User.findOne({ where: { username } });
            if (candidate) return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
            
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ name, surname, middlename, email, username, password: hashPassword });
            const token = generateJwt(user.id, user.username);

            return res.json({ token });
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ where: { username } })
            if (!user) return next(ApiError.badRequest('Пользователь с таким логином не найден'))
    
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) return next(ApiError.badRequest('Неверный пароль'))
            const token = generateJwt(user.id, user.username)
    
            return res.json({ token })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
        
    }
}

module.exports = new UserController();