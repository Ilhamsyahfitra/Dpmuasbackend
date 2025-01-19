const express = require('express');
const router = express.Router();
const { getComics, getComicById, createComic } = require('../controllers/comicController');

// Route to get all comics
router.get('/', getComics);

// Route to get a comic by ID
router.get('/:id', getComicById);

// Route to create a new comic
router.post('/', createComic);

module.exports = router;
