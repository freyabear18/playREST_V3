// Freya Avalon Orla Mann --  Models and schemas for users

const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    login: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        //encrypt
    }
});

let User = mongoose.model('users', userSchema);

module.exports = User;