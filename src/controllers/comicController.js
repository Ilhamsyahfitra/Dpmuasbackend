const Comic = require('../models/comic');
const Joi = require('joi');

// Get all comics
const getComics = async (req, res) => {
    try {
        const comics = await Comic.find();
        res.status(200).json(comics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comics' });
    }
};

// Get comic by ID
const getComicById = async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) return res.status(404).json({ error: 'Comic not found' });
        res.status(200).json(comic);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comic' });
    }
};

// Create a new comic
const createComic = async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        image: Joi.string().uri().required(),
        description: Joi.string().required(),
        content: Joi.array().items(Joi.string()).required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const newComic = new Comic(value);
        const savedComic = await newComic.save();
        res.status(201).json(savedComic);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comic', details: error.message });
    }
};

module.exports = { getComics, getComicById, createComic };
