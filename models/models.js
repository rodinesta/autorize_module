const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 255],
        },
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 255],
        },
    },
    middlename: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 255],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            len: [2, 255],
        },
    },
    username: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 15],
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/
        },
    },
    is_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

const Token = sequelize.define('token', {
    userId: {type: DataTypes.INTEGER},
    refreshToken: {type: DataTypes.STRING}
})

module.exports = {User, Token};