const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class NoteService {
    
    constructor() {
        this._poll = new Pool();
    }

    async addNote({title, body}) {
        
        const id = `note-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = created;

        const query = {
            text = `INSERT INTO notes_api VALUES($1, $2, $3, $4, $5) RETURNING id`,
            values = [id, title, body, createdAt, updatedAt]
        }

        const result = await this._poll.query(query);

        if (!result.rows[0].id) {
            throw new Error('Add new note failure')
        }

        return result.rows[0];

    }

}