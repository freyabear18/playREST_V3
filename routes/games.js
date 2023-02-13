// Freya Avalon Orla Mann -- Game routes

const auth = require('../utils/auth');

const express = require('express');
const multer = require('multer');
 
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
});

let upload = multer({
    storage: storage
});

let Game = require(__dirname + '/../models/game.js');
let router = express.Router();

// Servicio de listado general

router.get('/', auth, (req, res) => {
    Game.find().then(result => {
        res.render('admin_games', {games: result});
    }).catch(error => {
        res.render('admin_error');
    });
});

router.get('/games/new', auth, (req, res) => {
    res.render('admin_games_form');
});

router.get('/games/edit/:id', auth, (req, res) => {
    Game.findById(req.params['id']).then(result =>{
        if(result){
            res.render('admin_games_form', {game: result});
        } else{
            res.render('admin_error', { error: "Game not found." });
        }
    }).catch(error=>{
        res.render('admin_error');
    });
});

router.get('/games/edit/editions/:gameId', auth, (req, res) => {
    Game.findById(req.params['id']).then(result =>{
        res.render('admin_games_form', {gameEdition: result});
    }).catch(error=>{
        res.render('admin_error');
    });
});

router.post('/games/', upload.single('image'), (req, res) => {
    let newGame = new Game({
        name: req.body.name,
        description: req.body.description,
        minAge: req.body.minAge,
        players: req.body.players,
        type: req.body.type,
        price: req.body.price,
        image: req.file.filename
    });

    newGame.save().then(result => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: error});
    });
});

router.put('/games/:id', auth, (req, res) => {
    Game.findByIdAndUpdate(req.params.id, {
        $set:{
            name: req.body.name,
            description: req.body.description,
            minAge: req.body.minAge,
            players: req.body.players,
            type: req.body.type,
            price: req.body.price
        }
    }, {new: true}).then(result =>{
        res.redirect(req.baseUrl);
    }).catch(error=>{
        res.render('admin_error');
    });
});

router.delete('/games/:id', auth, (req, res) => {
    Game.findByIdAndRemove(req.params.id).then(result => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error');
    });
});

module.exports = router;