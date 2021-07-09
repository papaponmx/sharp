import { MAX_AGE, getTokenCookie, setTokenCookie } from './auth-cookies';

import Iron from '@hapi/iron';
import { NextApiRequest } from 'next';
import { Session } from '../types/index';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function setLoginSession(res: any, session: Session) {
  if (!TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined');
  }
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

/**
 *
 * @description Unseals session and returns Magic session metadata
 * @returns Magic Meta Data: An object containing the issuer, email and cryptographic public address of the authenticated user.
 * See [Magic Docs for reference](https://magic.link/docs/client-sdk/web/api-reference#getmetadata)
 */
export const getLoginSession = async (req: NextApiRequest) => {
  if (!TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined');
  }

  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
};
