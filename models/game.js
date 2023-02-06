// Freya Avalon Orla Mann -- Models and schemas for games and their editions

const mongoose = require('mongoose');

let editionSchema = new mongoose.Schema({
    edition: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 2000,
        max: 2022
    }
});

let gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    minAge: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    players: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum:['roleplay', 'escape', 'dice', 'token', 'card', 'board']
    },
    price: {
        type: Number,
        min: 0
    },
    image: {
        type: String,
        required: false
    },
    editions: [editionSchema]
});

let Game = mongoose.model('games', gameSchema);

module.exports = Game;