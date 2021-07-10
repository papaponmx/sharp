import { FAUNA_GRAPHQL_URL, faunaDefaultOptions } from '.';
import { HealthData, UpdateHealthDataInput } from '../types/index';

import { JSONLog } from '../utils/index';
import { UPDATE_USER_HEALTH_DATA_MUTATION } from '../graphql/queries/users';

/**
 * @description Update user HealthData in FaunaDB
 *  @param
 */

export const updateUserHealthData = async (
  updateHealthDataInput: UpdateHealthDataInput,
) => {
  const { _id, healthData } = updateHealthDataInput;
  if (!FAUNA_GRAPHQL_URL) {
    throw new Error('FAUNA_GRAPHQL_URL is not defined');
  }

  const body = JSON.stringify({
    operationName: 'UpdateHealthData',
    query: UPDATE_USER_HEALTH_DATA_MUTATION,
    variables: {
      _id,
      data: healthData,
    },
  });

  const res = await fetch(FAUNA_GRAPHQL_URL, {
    ...faunaDefaultOptions,
    body,
  })
    .then(response => {
      console.log('👀 createUser', response);
      return response?.json();
    })
    .catch(error => {
      throw new Error(
        `Error executing UPDATE_USER_HEALTH_DATA_MUTATION:  ${error}`,
      );
    });

  console.log('🤓');

  JSONLog(res);
  // TODO: Add error handling
  return res;
};
