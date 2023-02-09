// Freya Avalon Orla Mann -- Generation of predefined users

const mongoose = require('mongoose');
const User = require(__dirname + '/../models/user');

mongoose.connect('mongodb://mymongodb/playrest_v3');

User.collection.drop();

let usu1 = new User({
    login: 'freyaMann',
    password: '12345678'
});


let usu2 = new User({
    login: 'davidMiguel',
    password: '87654321'
});


export function saveUsers(){
    usu1.save();
    usu2.save();
}