/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addConstraint('notes', 'fk_notes.id_to_tags.tags_id', 'FOREIGN KEY(tag_id) REFERENCES Tags(tag_id) ON DELETE CASCADE ')
};

exports.down = pgm => {
    pgm.dropConstraint('notes', 'fk_notes.id_to_tags.tags_id');
};
