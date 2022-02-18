const { string } = require('joi');
const Joi = require('joi');

const validationBodyNotes = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
})


module.exports = validationBodyNotes();