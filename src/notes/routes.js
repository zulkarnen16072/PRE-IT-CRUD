const express = require('express');
const route = express.Router();
const NoteServices = require('./note.services') 
const noteServices = new NoteServices();

route.post('/notes', async(req, res) => {

    const {title, body} = req.body;

    const result = await noteServices.addNote({title, body})
    
    res.json(result)

});

route.get('/notes', async (req, res) => {

    const result = await noteServices.getNotes();
    res.json(result)

});


route.get('/notes/:notesID', async (req, res) => {

    const noteID = req.params.notesID;

    try {

        const noteByID = await noteServices.getNotesByID(noteID);
        res.json(noteByID)

    } catch(e) {

        res.status(404)
        res.json({
            
            code: 404,
            error: 'not found',
            message: e.message,

        })

    }
});



route.put('/notes/:id', async (req, res) => {

    const noteID = req.params.id;
    const {title, body} = req.body;

    const result = await noteServices.updateNoteByID(noteID, {title, body})
    
    res.json(result);

});



route.delete('/notes/:noteID', async(req, res) => {

    const noteID = req.params.noteID;

    try {
        
        const result = await noteServices.deleteNoteByID(noteID);
        console.info(result)
        res.json({message: `note dengan judul ${result} berhasil dihapus`})

    } catch (e) {

        res.status(404)
        res.json({message: e.message})
    }

})

module.exports = route;