const { nanoid } = require("nanoid");
const { renameFunction } = require("node-pg-migrate/dist/operations/functions");
const { Pool, DatabaseError } = require("pg");

class NoteServices {
    
    constructor() {
        this._poll = new Pool();
    }

    async addNote({title, body}) {
        
        const id = `note-${nanoid(16)}`;
        const createdAt = new Date().toLocaleString("id-ID");;
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


    async getNotesByID(noteID) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [noteID]
        }

        const result = await this._poll.query(query);

        if (!result.rows.length) {

            throw new Error('Note tidak ditemukan')

        }

        return result.rows[0]

    }


    async updateNoteByID(noteID, {title, body}) {

        const updatedAt = new Date().toLocaleString("id-ID");

        const query = {
            text: 'UPDATE notes SET title=$1, body=$2, updated_at=$3 WHERE id = $4 RETURNING id',
            values: [title, body, updatedAt, noteID]
        }

        const result = await this._poll.query(query);

        if (!result.rows.length) {
            throw new Error(`Note tidak dapat diubah, ${noteID} tidak ditemukan`)
        }

        
    }


    async deleteNoteByID(noteID) {
        
        const result = await this._poll.query('DELETE FROM notes WHERE id=$1 RETURNING title', [noteID])
            
        if(!result.rowCount) {
            throw new Error('delete note failure')
        }

        return result
            
    }


}

module.exports = NoteServices;
