const express = require('express');
const Artist = require('../models/artistModels');

const getArtists = async (req, res) => {
    try {
        const artists = await Artist.findAll();
        res.json(artists);
    }
    catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los artistas' });
    }
}


const createArtist = async (req, res) => {
    const { name, nationality, birth_date, death_date, biography, image_url, genre } = req.body;

    try {
        // Verificar que los campos obligatorios estén presentes
        if (!name || !nationality || !birth_date) {
            return res.status(400).json({ message: 'El nombre, nacionalidad y fecha de nacimiento son obligatorios.' });
        }

        // Crear un nuevo artista
        const artist = await Artist.create({
            name,
            nationality,
            birth_date,
            death_date,  // Este campo es opcional, por lo que no es obligatorio
            biography,   // Este campo es opcional
            image_url,   // Este campo es opcional
            genre        // Este campo es opcional
        });

        // Responder con el artista creado
        res.status(201).json(artist);
    } catch (err) {
        console.error('Error al crear el artista:', err);
        res.status(500).json({ message: 'Error al crear el artista.' });
    }
};

module.exports = {
    getArtists,
    createArtist,
 
}
