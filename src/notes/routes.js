const express = require('express');
const route = express.Router();
const NoteServices = require('./note.services') 
const noteServices = new NoteServices();

route.post('/notes', async(req, res) => {

    const {title, body} = req.body;

    await noteServices.addNote({title, body})
    
    res.json('Create a new note successfully')

});

route.get('/notes', async (req, res) => {

    const result = await noteServices.getNotes();
    res.json(result)

});

// route.get('/notes/:notesID', (req, res) => {

// });

module.exports = route;