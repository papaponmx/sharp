import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url)
    .then(r => r.json())
    .catch(_err => {
      throw new Error('😕 Error fetching user data');
    });

export type UseUserParams = {
  redirectTo?: string;
  redirectIfFound?: string;
};

/***
 * TODO: Document this hook
 */
export function useUser({ redirectTo, redirectIfFound }: UseUserParams = {}) {
  const { data, error } = useSWR('/api/user', fetcher);
  const user = data;
  const finished = Boolean(data);
  const hasUser = Boolean(data.magicSession);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
}
