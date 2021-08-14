import { FAUNA_GRAPHQL_URL } from '$lib/config';
import { GET_USER_BY_EMAIL_QUERY } from '$lib/graphql/queries';

import { faunaDefaultOptions } from '.';

/**
 * @description Query user by email to FaunaDB
 * @param email
 * @returns
 */
export const getUserByEmail = async (
  email: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
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

  if (!user.data) {
    throw new Error(
      'Error executing GET_USER_BY_EMAIL_QUERY No data in response',
    );
  }

  console.log(!!user.data.userByEmail && '✅ getUserByEmail');
  // JSONLog(user.data.userByEmail);
  const userByEmail = user?.data?.userByEmail;
  return userByEmail;
};
