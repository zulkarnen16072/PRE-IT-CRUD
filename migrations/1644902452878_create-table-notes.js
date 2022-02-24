/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('notes', {
        id: {
            type: 'VARCHAR(50)',
            notNull: true,
            primaryKey: true,
        },
        title: {
            type: 'TEXT',
            notNull: true
        },
        body: {
            type: 'TEXT',
            notNull: true
        },
        createdAt: {
            type: 'TEXT',
            notNull: true
        },
        updatedAt: {
            type: 'TEXT',
            notNull: true
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('notes')
};
