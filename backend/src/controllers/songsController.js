const express = require('express');
const Songs = require('../models/songsModels')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..',  'uploads/songs');  // Define la ruta de almacenamiento
        cb(null, uploadPath);  // Si la carpeta no existe, deberá crearse manualmente
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);  // Obtiene la extensión del archivo
        const filename = `${Date.now()}${fileExtension}`;  // Nombre único para evitar colisiones
        cb(null, filename);  // Se le asigna un nombre único al archivo
    }

})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        if (file.mimetype.startsWith('audio/')) {
            cb(null, true);  // Aceptar solo archivos de audio
        } else {
            cb(new Error('Solo se permiten archivos de audio'), false);  // Si no es audio, rechazarlo
        }
    }
}).single('audio')

const getSongs = async (req, res) => {
    try {
        const songs = await Songs.findAll();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los datos' });
    }
}

const createSongs = async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        console.log('upload song', )
        let audioUpload = null;
        if (req.file) {
            audioUpload = `/uploads/songs/${req.file.filename}`;
        }
        try {
            const { title, artist_id, album_id, release_year, lyric } = req.body;
            const songData = await Songs.create({
                title,
                artist_id,
                album_id,
                release_year,
                audio_url: audioUpload ,
                lyric,
    
            });
            console.log('created song', songData);
            
            res.status(201).json(songData);
        } catch (error) {
            res.status(400).json({ message: 'Hubo un error al crear la canción'});
            //especificar el error
            console.error('Error al crear canción:', error);
            
            
        }


    })
}


module.exports = {
    getSongs,
    createSongs,
};
