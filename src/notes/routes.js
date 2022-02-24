const express = require('express');
const validationBodyNotes = require('../utils/validationUtil');
const route = express.Router();
const NoteServices = require('./note.services') 
const noteServices = new NoteServices();


route.get('/notes', async (req, res) => {

    try {
        
        const notes = await noteServices.getNotes();
        res.json({
            status: 'success',
            data: {
                notes
            }
        })
        
    } catch (e) {
        res.status(404)
        .json({
            error: {
                code: 404,
                status: 'not found',
                message: e.message
            }
        })
    }
    
});


route.get('/notes/:notesID', async (req, res) => {

    const id = req.params.notesID;
 

    try {

        const note = await noteServices.getNotesByID(id);
        res.json({
            status: 'success',
            data: note
        })

    } catch(e) {

        res.status(404)
        .json({ 
            error: {
                code: 404,
                status: 'not found',
                message: e.message,
            }  
        })

    }
});


route.post('/notes', async(req, res) => {
     
    try {

        // await validationBodyNotes.validateAsync(req.body);
        const result = await noteServices.addNote(req.body)
        res.status(200)
        .json({
            status: 'success',
            message: 'note created successfully',
            data: result
        })

    } catch(e) {
        res.status(400)
        .json({
            status: 'failure',
            message: e.message
        })
    }
    

});




route.put('/notes/:id', async (req, res) => {

    const noteID = req.params.id;

    try {
        await validationBodyNotes.validateAsync(req.body);
        await noteServices.updateNoteByID(noteID, req.body)
        res.json({
            status: 'success',
            message: 'notes updated successfully',
        });
    } catch (e) {
        res.status(400)
        .json({ 
            error: {
                code: 400,
                status: 'bad request',
                message: e.message,
            }  
        })
    } 
    

});



route.delete('/notes/:noteID', async(req, res) => {

    const noteID = req.params.noteID;

    try {
        
        const titleResult = await noteServices.deleteNoteByID(noteID);
        console.info(titleResult)
        res.json({message: `note dengan judul ${titleResult.rows[0].title} berhasil dihapus`})

    } catch (e) {

        res.status(404)
        res.json({message: e.message})
    }

})

module.exports = route;