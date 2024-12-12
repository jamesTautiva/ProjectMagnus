const { getArtists, createArtist} = require('../controllers/artistController')
const { getUsers, postUsers, loginUser, forgotPassword, resetPassword, dashboard} = require('../controllers/userController');
const { getAlbums, createAlbum} = require('../controllers/albumController')
const { getSongs, createSongs} = require('../controllers/songsController')
const { userValidation, validate } = require('../validations/userValidation');

const path = require('path');


const express = require('express');
const router = express.Router();

// users
router.get("/users", getUsers);
router.post("/users",userValidation,validate, postUsers);
    // login
    router.post('/login', loginUser);
        // recovery password
        router.post('/recovery', forgotPassword );
        router.post('/recovery/:token', resetPassword)


// artists
    router.get("/artists", getArtists);
    router.post("/artists", createArtist);

    // dashboard
    router.get('/dashboard', dashboard);

    // albums
    router.get("/albums", getAlbums);
    router.post("/albums",createAlbum);
    router.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// songs

router.get("/songs/:id", getSongs);
    router.post("/songs", createSongs);

   


//uploads
module.exports = router;