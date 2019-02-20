/* eslint-disable indent */
/* eslint-disable no-tabs */
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

const connect = async () => pool.connect();
let adminQuery;
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash('karlmusingo', salt, async (err, hash) => {
        adminQuery = `INSERT INTO users(
        firstname, lastname, othername, phonenumber, username, email, password, isAdmin
    ) VALUES (
        'karl', 'musingo', 'marx', '0977849995', 'karlmusingo', 'karlmusingo77@gmail.com', ${ hash }, true
    );
  `;
    });
});
const createTablesQuery = `CREATE TABLE comments
        (
            id integer NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
            question integer,
            user_id integer,
            comment character varying(255) COLLATE pg_catalog."default",
            CONSTRAINT comments_pkey PRIMARY KEY (id)
        );
        

        CREATE TABLE meetups
        (
            createdon date NOT NULL DEFAULT CURRENT_DATE,
            location character varying(255) COLLATE pg_catalog."default",
            topic character varying(255) COLLATE pg_catalog."default",
            happeningon date,
            images character varying(50)[] COLLATE pg_catalog."default",
            tags character varying(50)[] COLLATE pg_catalog."default",
            id integer NOT NULL DEFAULT nextval('meetups_id_seq'::regclass)
        );

        CREATE TABLE questions
        (
            createdon date NOT NULL DEFAULT CURRENT_DATE,
            createdby integer,
            meetup integer,
            title character(255) COLLATE pg_catalog."default",
            body text COLLATE pg_catalog."default",
            upvotes integer DEFAULT 0,
            downvotes integer DEFAULT 0,
            id integer NOT NULL DEFAULT nextval('questions_id_seq'::regclass)
        );

        CREATE TABLE rsvps
        (
            id integer NOT NULL DEFAULT nextval('rsvps_id_seq'::regclass),
            meetup integer,
            user_id integer,
            status character varying(20) COLLATE pg_catalog."default",
            CONSTRAINT rsvps_pkey PRIMARY KEY (id)
        );

        CREATE TABLE users
        (
            firstname character varying(50) COLLATE pg_catalog."default",
            lastname character varying(50) COLLATE pg_catalog."default",
            othername character varying(50) COLLATE pg_catalog."default",
            email character varying(50) COLLATE pg_catalog."default",
            phonenumber character varying(50) COLLATE pg_catalog."default",
            username character varying(50) COLLATE pg_catalog."default",
            password character varying(255) COLLATE pg_catalog."default",
            registered date NOT NULL DEFAULT CURRENT_DATE,
            isadmin boolean NOT NULL,
            id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass)
        );

        CREATE TABLE votes
        (
            user_id integer NOT NULL,
            question_id integer NOT NULL,
            status character varying(200) COLLATE pg_catalog."default",
            CONSTRAINT votes_pkey PRIMARY KEY (user_id, question_id)
        );`;

const migrateDb = () => new Promise(async (resolve) => {
    // const connection = await connect();
    // await connection.query(createTablesQuery);
    // await connection.query(adminQuery);
    // connection.release();
    resolve();
});
migrateDb();
