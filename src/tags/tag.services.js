const { Pool } = require("pg");

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


    async getTags() {
        try {

            return await this.pool.query('SELECT * FROM Tags');


        } catch(e) {

        }
    }

}

module.exports = TagsServices;