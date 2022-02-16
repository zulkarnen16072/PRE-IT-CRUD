/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('notes', 'createdAt', 'created_at'),
    pgm.renameColumn('notes', 'updatedAt', 'updated_at')

};

exports.down = pgm => {
    pgm.dropColumn('notes', ['created_at', 'updated_at'])
};
