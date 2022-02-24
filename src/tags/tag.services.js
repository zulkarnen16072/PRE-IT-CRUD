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


            const r =  await this.pool.query('INSERT INTO tags VALUES($1, $2) RETURNING tag_id', [id, name]);
            return  r.rows[0].tag_id

        } catch(e) {
            console.log(e)
        }
    }

}

module.exports = TagsServices;