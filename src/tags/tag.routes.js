const express = require('express');
const NoteServices = require('../notes/note.services');
const TagsServices = require('./tag.services');
const routeTags = express.Router();

const tagServices = new TagsServices()
const noteServices = new NoteServices()


routeTags.get('/tags', async (req, res) => {

    try {
        const tags = await (await tagServices.getTags()).rows;

        res.json({
            code: 200,
            tags

        })
    } catch(e) {

    }

})


routeTags.get('/tags/:id', async (req, res) => {

    const tagID = req.params.id;

    try {
        const tags =  await tagServices.getTagById(tagID);
        const notes = await noteServices.getNoteByTagID(tagID);
        const countNotes = notes.rowCount;
        const noteRows = notes.rows.map(e => 
            {
                return {
                    id: e.id,
                    title: e.title
                }
            })


        console.info('Tags: ', tags)

        console.info('notes: ', notes)

        const data = {
            id: tags.tag_id,
            name: tags.name,
            countNotes,
            notes: noteRows
            
        }


        console.info(data)

        res.json({
            success: true,
            code: 200,
            data
            

        })
    } catch(e) {
        console.info(e)
    }

})


routeTags.post('/tags', async (req, res) => {

    try {
        const tag_id = await (await tagServices.addTags(req.body));

        res.json({
            code: 200,
            success: true,
            message: 'created one tags successfully',
            tag_id

        })
    } catch(e) {
        console.log(e.stack)
    }

})






module.exports = routeTags;

