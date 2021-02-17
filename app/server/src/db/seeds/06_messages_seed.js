exports.seed = async (knex) => {
  await knex('messages').del();

  await knex('messages').insert([
    {
      id: 1,
      authorId: 1,
      channelId: 1,
      text: 'First message!!',
    },
    {
      id: 2,
      authorId: 2,
      channelId: 1,
      text: 'Second message!!',
    },
  ]);

  await knex.raw(
    "SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages))"
  );
};
