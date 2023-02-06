// Freya Avalon Orla Mann -- Public Routes

const express = require('express');

let Game = require(__dirname + '/../models/game.js');
let router = express.Router();


router.get('/', (req, res) => {
    Game.find().then(result => {
        res.render('public_index', {games: result});
    }).catch(error => {
        res.render('public_error');
    });
});

// find
router.get('/search', (req, res) => {
    Game.find().then(result => {
        if (result){
            let gamesFound = result.filter(found => found.name.includes(req.query.name));

            if (gamesFound.length > 0){
                res.render('public_index', { games: gamesFound });
            } else {
                res.render('public_index', { error: "Could not find any games." });
            }
        } else {
            res.render('public_index', { error: "No games available." });
        }
    }).catch (error => {
        res.render('public_error');
    });
});

router.get('/games/:id', (req, res) => {
    Game.findById(req.params.id).then(result => {
        if(result){
            res.render('public_game', { game: result });
        } else {
            res.render('public_error', { error: "Game not found."});
        }
    }).catch (error => {
        res.render('public_error');
    });
});

module.exports = router;