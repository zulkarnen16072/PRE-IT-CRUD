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


module.exports = routeTags;

