import {
  CREATE_USER_MUTATION,
  GET_USER_BY_EMAIL_QUERY,
} from '../graphql/queries/users';
import { CreateUserInput, UserByEmailResponse } from '../types/index';

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
 * @description Query user by email to FaunaDB
 * @param email
 * @returns
 */
export const getUserByEmail = async (
  email: string,
): Promise<UserByEmailResponse> => {
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
    .then(response => response.json())
    .catch(error => {
      throw new Error(`Error executing GET_USER_BY_EMAIL_QUERY:  ${error}`);
    });
  // TODO: Add error handling
  return user.data.userByEmail;
};

/**
 * @description Create a user on FaunaDB
 * @param createUserInput
 */

export const createUser = async (userInput: CreateUserInput) => {
  if (!FAUNA_GRAPHQL_URL) {
    throw new Error('FAUNA_GRAPHQL_URL is not defined');
  }

  const body = JSON.stringify({
    operationName: 'CreateUser',
    query: CREATE_USER_MUTATION,
    variables: {
      userInput,
    },
  });

  const user = await fetch(FAUNA_GRAPHQL_URL, {
    ...faunaDefaultOptions,
    body,
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(`Error executing GET_USER_BY_EMAIL_QUERY:  ${error}`);
    });
  // TODO: Add error handling
  const res: UserByEmailResponse | null = user.data.createUser;
  return res;
};
