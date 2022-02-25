const { Pool } = require("pg");
const { nanoid } = require("nanoid");

class TagsServices {
    constructor() {

        this.pool = new Pool();

    }


    async getTags() {
        try {

            return await this.pool.query('SELECT * FROM Tags');


        } catch(e) {
            console.log(e.message)
        }
    }


    async addTags({name}) {

        const id = `tags-${nanoid(5)}`;

        try {
            return await (await this.pool.query('INSERT INTO Tags VALUES ($1, $2) RETURNING tag_id', [id, name])).rows[0];

        } catch(e) {
            console.log(e)
        }
    }



    async getTagById(id) {

        try {

            const r =  await this.pool.query('SELECT * FROM Tags WHERE tag_id = $1', [id]);
            return  r.rows[0]

        } catch(e) {
            console.log(e)
        }
    }

}

module.exports = TagsServices;