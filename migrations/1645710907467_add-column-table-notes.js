/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('notes', {
        tag_id: {
            type: 'varchar(50)'
        }
    })
};

exports.down = pgm => {
    pgm.dropColumn('notes', 'tag_id')
};
