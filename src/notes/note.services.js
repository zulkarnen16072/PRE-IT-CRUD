const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class NoteServices {
    
    constructor() {
        this._poll = new Pool();
    }

    async addNote({title, body}) {
        
        const id = `note-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, title, body, createdAt, updatedAt]
        }

        const result = await this._poll.query(query);

        if (!result.rows[0].id) {
            throw new Error('Add new note failure')
        }

        return result.rows[0];

    }

    async getNotes() {
        const result = await this._poll.query('SELECT * FROM notes');
        return result.rows;
    }

}

module.exports = NoteServices;
