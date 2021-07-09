/**
 * @description Create a user on FaunaDB
 * @param createUserInput
 */

import { CreateUserInput, UserByEmailResponse } from "../types";
import { FAUNA_GRAPHQL_URL, faunaDefaultOptions } from ".";

import { CREATE_USER_MUTATION } from "../graphql/queries/users";

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
    .then(response => {
      console.log('👀 createUser', response);

      return response?.json();
    })
    .catch(error => {
      throw new Error(`Error executing GET_USER_BY_EMAIL_QUERY:  ${error}`);
    });
  // TODO: Add error handling
  const res: UserByEmailResponse | null = user?.data?.createUser;
  return res;
};
