import { GET_USER_BY_EMAIL_QUERY } from '../queries/users';
import { UserByEmailResponse } from '../../types/index';
const { FAUNA_GRAPHQL_URL, FAUNA_SECRET } = process.env;
if (!FAUNA_SECRET) {
  throw new Error('FAUNA_SECRET is not set');
}

const Authorization = `Bearer ${FAUNA_SECRET}`;

const faunaDefaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization,
  },
};

/**
 * Query user by email to FaunaDB
 * @param email
 * @returns
 */
export const getUserByEmail = async (email: string) => {
  if (!FAUNA_GRAPHQL_URL) {
    throw new Error('FAUNA_GRAPHQL_URL is not defined');
  }

  const body = JSON.stringify({
    operationName: 'getUserByEmail',
    query: GET_USER_BY_EMAIL_QUERY,
    variables: {
      email,
    },
  });

  const user = await fetch(FAUNA_GRAPHQL_URL, {
    ...faunaDefaultOptions,
    body,
  })
    .then(res => res.json())
    .catch(err => {
      debugger;
    });
  // TODO: Add error handling
  const res: UserByEmailResponse | null = user.data.userByEmail;
  return res;
};

export const createUser = async () => {
  
}
