import knex from 'knex';
import connection from '../../knexfile';

const ENV = process.env.NODE_ENV || 'developement';

export default knex(connection[ENV]);
