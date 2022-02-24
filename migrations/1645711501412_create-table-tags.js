/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('tags', {
        tag_id: {
            type: 'varchar(50)',
            primaryKey: true,
            notNull: true,
        },
        name: {
            type: 'text',
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('notes');
};
