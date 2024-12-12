const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Artist = require('./artistModels')


const Album = sequelize.define('Album', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,  // Asegúrate de que el título no esté vacío
            len: [1, 255],   // Asegura que el título tenga entre 1 y 255 caracteres
        }
    },
    release_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true,  // Verifica que la fecha sea válida
        }
    },
    artist_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'artists',  // Asegúrate de que la tabla 'artists' esté correctamente referenciada
            key: 'id',
        },
    },
    image_url: { 
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,  
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'albums',    // Uso plural para seguir la convención
});

// Relación: Un álbum pertenece a un artista
Album.belongsTo(Artist, {
    foreignKey: 'artist_id', // Nombre de la clave externa
    as: 'artist'             // Alias para la relación (opcional)
});
// relacion con songs


Album.sync({ force: true})  // Crea la tabla si no existe
   .then(() => console.log('Tabla de álbumes creada con éxito'))
   .catch(error => console.error('Error creando la tabla:', error));

module.exports = Album;