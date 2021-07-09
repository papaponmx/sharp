import { NextApiRequest, NextApiResponse } from 'next';
import { Session, UserByEmailResponse } from '../../types/index';
import { createUser, getUserByEmail } from '../../db';

import { getLoginSession } from '../../lib/auth';

export type MagicSession = {
  issuer: string;
  publicAddress: string;
  email: string;
  createdAt: number;
  maxAge: number;
};

/**
 * @typedef {Object} UserResponse
 * @description Object returned by /api internal route,
 * combines Magic information with Fauna DB information
 * @property {string} issuer - The Decentralized ID of the user for Magic
 * @property {string} email - User email
 */
export type UserResponse = {
  session: MagicSession;
  userProfile: UserByEmailResponse;
};

const generateUserResponse = (
  magicSession: MagicSession,
  userData: UserByEmailResponse,
): UserResponse => ({
  session: magicSession,
  userProfile: userData,
});

const user = async (request: NextApiRequest, response: NextApiResponse) => {
  const session: Session = await getLoginSession(request);
  const userEmail: string = session?.email;

  const userByEmail = await getUserByEmail(userEmail);

  if (!userByEmail) {
    const createdUser = await createUser({ email: userEmail });
  }

  const generatedResponse = generateUserResponse(session, userByEmail);
  console.assert(generatedResponse, '🙄', generatedResponse);

  // TODO: Handle error
  // res.status(404).json({ user: null })
  response.status(200).json(JSON.stringify(generatedResponse));
};

export default user;
