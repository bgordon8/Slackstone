exports.up = function (knex) {
  return knex.schema.createTable('direct_messages', (table) => {
    table.increments();
    table
      .integer('senderId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table
      .integer('recipientId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table
      .integer('workspaceId')
      .notNullable()
      .references('workspaces.id')
      .onDelete('CASCADE');
    table.text('text').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('direct_messages');
};
