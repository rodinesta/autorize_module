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
            is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        },
    },
    is_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = User;