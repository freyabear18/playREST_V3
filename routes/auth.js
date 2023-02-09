// Freya Avalon Orla Mann -- Auth routes

const express = require('express');
const { saveUsers } = require('../utils/generate_users');
const User = require(__dirname + '/../models/user.js');
const generate_users = require(__dirname + '/../utils/generate_users.js');

let router = express.Router();
let users = [];

router.get('/users', (req, res)=> {
    saveUsers();
    res.render('auth_login'); 
});

router.get('/login', (req, res) => {
    res.render('auth_login');
});

router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    User.find().then(result =>{
        users = result;

        let userExists = users.filter(user=>
            user.login == login && user.password == password);
        
        if (userExists.length > 0){
            req.session.login = userExists[0].login;
            res.render('admin_games');
        } else {
            res.render('auth_login', { error: "Incorrect user." })
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('public_index');
});

module.exports = router;