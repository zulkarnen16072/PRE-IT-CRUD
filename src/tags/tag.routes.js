const express = require('express');
const TagsServices = require('./tag.services');
const routeTags = express.Router();

const tagServices = new TagsServices()

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

