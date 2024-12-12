const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Artist = require('./artistModels')
const Album = require('./albumModels')

const Song = sequelize.define('Song', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,  
            len: [1, 255],   
        }
    },
    artist_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'artists',  
            key: 'id'
        }
    },
    album_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'albums',  
            key: 'id'
        }
    },
    release_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,  
            min: 1900,    
            max: new Date().getFullYear(),  
        }
    },
    audio_url: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    lirycs:{
        type: DataTypes.TEXT,
        allowNull: true,  
        validate: {
            notEmpty: true,  
            len: [1, 2000],   
        }
    }
}, {
    tableName: 'songs',  
    timestamps: true,  
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,  
    paranoid: true,     
});


Song.belongsTo(Artist, {
    foreignKey: 'artist_id',
    as: 'artist'  
});
Song.belongsTo(Album, {
    foreignKey: 'album_id',
    as: 'album'  
});

Song.sync({ force: true })  // Crea la tabla en caso de que no exista
   .then(() => console.log('Tablas artist creadas con éxito'))
   .catch(error => console.error('Error creando las tablas:', error));

module.exports = Song;