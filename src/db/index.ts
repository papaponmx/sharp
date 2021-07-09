export const { FAUNA_GRAPHQL_URL, FAUNA_SECRET } = process.env;

if (!FAUNA_SECRET) {
  throw new Error('FAUNA_SECRET is not set');
}

export const Authorization = `Bearer ${FAUNA_SECRET}`;

export const faunaDefaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization,
  },
};

export * from './create-user';
export * from './get-user-by-email';
