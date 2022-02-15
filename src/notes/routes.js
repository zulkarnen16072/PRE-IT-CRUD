const express = require('express');
const route = express.Router();
const NoteServices = require('./note.services') 

route.post('/notes', async(req, res) => {

    const {title, body} = req.body;

    await new NoteServices().addNote({title, body})
    
    res.json('Create a new note successfully')

});

// route.get('/notes', (req, res) => {

// });

// route.get('/notes/:notesID', (req, res) => {

// });

module.exports = route;