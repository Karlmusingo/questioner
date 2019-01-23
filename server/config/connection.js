/* eslint-disable indent */
import pg from 'pg';

const config = {
    user: 'postgres',
    database: 'questioner',
    password: '5432',
    port: 5432,
};
const pool = new pg.Pool(config);

module.exports = pool;
