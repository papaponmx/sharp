import dotenv from 'dotenv';

dotenv.config();

export const SESSION_NAME = 'session';
export const SESSION_LENGTH_MS = Number.parseInt(process.env['SESSION_LENGTH_MS']);

export const MAGIC_SECRET_KEY = process.env['MAGIC_SECRET_KEY'];
export const ENCRYPTION_SECRET = process.env['ENCRYPTION_SECRET'];
export const FAUNA_SECRET = process.env['FAUNA_SECRET']
export const FAUNA_GRAPHQL_URL = process.env['FAUNA_GRAPHQL_URL']


if (!FAUNA_SECRET || FAUNA_GRAPHQL_URL === undefined) {
  throw new Error('FAUNA_SECRET is not set');
}