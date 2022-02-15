/* eslint-disable camelcase */

const { PgType } = require("node-pg-migrate");

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('notes', {
        id: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        title: {
            type: 'TEXT',
            notNull: true
        },
        body: {
            type: 'TEXT',
            notNull: true
        },
        createAt: {
            type: 'TEXT',
            notNull: true
        },
        createAt: {
            type: 'TEXT',
            notNull: true
        },
    })
};

exports.down = pgm => {};
