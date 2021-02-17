exports.seed = async (knex) => {
  await knex('user_channels').del();

  await knex('user_channels').insert([
    {
      id: 1,
      userId: 1,
      channelId: 1,
    },
    {
      id: 2,
      userId: 2,
      channelId: 1,
    },
  ]);

  await knex.raw(
    "SELECT setval('user_channels_id_seq', (SELECT MAX(id) FROM user_channels))"
  );
};
