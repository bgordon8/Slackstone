const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('password123', salt);

  await knex('users').del();

  await knex('users').insert([
    {
      id: 1,
      username: 'newUser',
      email: 'user@email.com',
      password: hash,
      role: 'ADMIN',
    },
  ]);

  await knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
};
