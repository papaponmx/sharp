
export const {FAUNA_SECRET, FAUNA_GRAPHQL_URL} = process.env

if (!FAUNA_SECRET || FAUNA_GRAPHQL_URL === undefined) {
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

export * from './getUserById'