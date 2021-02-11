exports.seed = async (knex) => {
  await knex('workspaces').del();

  await knex('workspaces').insert([
    {
      id: 1,
      name: 'apollo',
      ownerId: 1,
      created_at: new Date('7/15/1984').toISOString(),
      updated_at: new Date('7/15/1984').toISOString(),
    },
  ]);

  await knex.raw(
    "SELECT setval('workspaces_id_seq', (SELECT MAX(id) FROM workspaces))"
  );
};
