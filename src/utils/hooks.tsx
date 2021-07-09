import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export type UseUserParams = {
  redirectTo: string;
  redirectIfFound: string;
};

/***
 * TODO: Document this hook
 */
export const useUser = ({
  redirectTo,
  redirectIfFound,
}: UseUserParams): {
  user: any; // TODO: Type this
  error: any;
  mutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
} => {
  const { data, error, mutate } = useSWR('/api/user', fetcher);
  const user = data?.user;

  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found.
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return { user, error, mutate };
};