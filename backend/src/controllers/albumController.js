const express = require('express');
const Album = require('../models/albumModels');
const multer = require('multer');
const path = require('path');



// Configuración de Multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads/images');  // Define la ruta de almacenamiento
        cb(null, uploadPath);  // Si la carpeta no existe, deberá crearse manualmente
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);  // Obtiene la extensión del archivo
        const filename = `${Date.now()}${fileExtension}`;  // Nombre único para evitar colisiones
        cb(null, filename);  // Se le asigna un nombre único al archivo
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;  // Tipos de archivo permitidos
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        
        
        if (extname && mimetype) {
            return cb(null, true);  // El archivo es válido
        } else {
            cb(new Error('Archivo no permitido'));  // Si el archivo no es válido
        }
    }
}).single('image');  // 'image' es el nombre del campo en el formulario

// Obtener todos los álbumes
const getAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.json(albums);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo álbum
const createAlbum = async (req, res) => {
    // Se utiliza multer para procesar la imagen
    upload(req, res, async (err) => {
        if (err) {
            console.log('Error de Multer:', err);  // Imprimir el error en consola
            return res.status(400).json({ message: `Error al subir la imagen: ${err.message}` });
        }

        console.log('Archivo subido correctamente:');

        // Obtener la URL de la imagen subida
        let albumImageUrl = null;
        if (req.file) {
            albumImageUrl = `/uploads/images/${req.file.filename}`;  // La URL de la imagen se guarda en la base de datos
        }
        
        // Validar los datos del álbum
        console.log(req.body);
        

        // Crear el álbum en la base de datos
        try {
            const { title, release_date, artist_id } = req.body;
            

            const albumData = await Album.create({
                title,
                release_date,
                artist_id,
                image_url: albumImageUrl  // Guardamos la URL de la imagen
            });
            console.log('Album creado:');  // Imprimir el álbum creado en consola

            res.status(201).json(albumData);  // Respondemos con el álbum creado
        } catch (err) {
            console.error('Error al crear el álbum:', err);
            res.status(500).json({ message: 'Error al crear el álbum.', error: err.message });
        }
    });
};

module.exports = {
    getAlbums,
    createAlbum,
 
};