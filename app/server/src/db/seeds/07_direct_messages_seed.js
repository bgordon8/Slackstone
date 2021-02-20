exports.seed = async (knex) => {
  await knex('direct_messages').del();

  await knex('direct_messages').insert([
    {
      id: 1,
      senderId: 1,
      recipientId: 2,
      workspaceId: 1,
      text: 'Private message!!',
    },
    {
      id: 2,
      senderId: 2,
      recipientId: 1,
      workspaceId: 1,
      text: 'Second message!!',
    },
  ]);

  await knex.raw(
    "SELECT setval('direct_messages_id_seq', (SELECT MAX(id) FROM direct_messages))"
  );
};
