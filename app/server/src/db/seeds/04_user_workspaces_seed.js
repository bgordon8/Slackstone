exports.seed = async (knex) => {
  await knex('user_workspaces').del();

  await knex('user_workspaces').insert([
    {
      id: 1,
      userId: 1,
      workspaceId: 1,
    },
    {
      id: 2,
      userId: 2,
      workspaceId: 1,
    },
  ]);

  await knex.raw(
    "SELECT setval('user_workspaces_id_seq', (SELECT MAX(id) FROM user_workspaces))"
  );
};
