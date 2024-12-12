const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Importa la conexión de base de datos


// Definir el modelo de Usuario
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    }, {
    tableName: 'users',  // Nombre de la tabla en la base de datos
    timestamps: false        // Si no tienes createdAt y updatedAt en tu tabla
});

// crear tabas a mysql

User.sync({ force: false })  // Crea la tabla en caso de que no exista
   .then(() => console.log('Tablas creadas con éxito'))
   .catch(error => console.error('Error creando las tablas:', error));





module.exports = User;