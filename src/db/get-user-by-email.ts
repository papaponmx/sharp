import { FAUNA_GRAPHQL_URL, faunaDefaultOptions } from '.';

import { GET_USER_BY_EMAIL_QUERY } from '../graphql/queries/users';
import { UserByEmailResponse } from '../types';

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

  console.assert(user, '🥲 user is not here');
  console.log(!!user.data.userByEmail && '✅ getUserByEmail');
  // JSONLog(user.data.userByEmail);
  const userByEmail = user?.data?.userByEmail;
  return userByEmail;
};
