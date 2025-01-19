const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: [String], required: true }, // Array for comic content
});

module.exports = mongoose.model('Comic', comicSchema);
