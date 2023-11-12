const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connect')
const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // avatar: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
});

// Export the User model
module.exports = User;
