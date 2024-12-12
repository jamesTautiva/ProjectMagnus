const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Artist = sequelize.define('Artist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,  
        validate: {
            notEmpty: true,  
            len: [1, 255],  
        }
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,  
        validate: {
            notEmpty: true,
            len: [1, 100],  
        }
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,  
        validate: {
            isDate: true, 
        }
    },
    death_date: {
        type: DataTypes.DATEONLY,
        validate: {
            isDate: true,  
        }
    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: true,  
    },
    image_url: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,  
        }
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,  
    }
}, {

    timestamps: true,  
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'artists',  
});

Artist.sync({ force: false })  // Crea la tabla en caso de que no exista
   .then(() => console.log('Tablas artist creadas con éxito'))
   .catch(error => console.error('Error creando las tablas:', error));




module.exports = Artist;