exports.seed = async (knex) => {
  await knex('users').del();

  await knex('users').insert([
    {
      username: 'newUser',
      email: 'user@email.com',
      password: 'password123',
      role: 'ADMIN',
    },
  ]);

  await knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
};
