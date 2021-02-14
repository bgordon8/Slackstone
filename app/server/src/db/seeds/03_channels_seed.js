exports.seed = async (knex) => {
  await knex('channels').del();

  await knex('channels').insert([
    {
      id: 1,
      name: 'general',
      default: true,
      workspaceId: 1,
    },
  ]);

  await knex.raw(
    "SELECT setval('channels_id_seq', (SELECT MAX(id) FROM channels))"
  );
};
