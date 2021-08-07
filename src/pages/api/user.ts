import { NextApiRequest, NextApiResponse } from 'next';
import router from 'next/router';

import { createUser, getUserByEmail } from '../../db';
import { getLoginSession } from '../../lib/auth';
import { Session, UserByEmailResponse } from '../../types/index';

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
  session: MagicSession,
  userProfile: UserByEmailResponse,
): UserResponse => ({
  session,
  userProfile,
});

const user = async (request: NextApiRequest, response: NextApiResponse) => {
  const session: Session = await getLoginSession(request);

  if (!session) {
    router.push('/login');
  }

  const userEmail: string = session.email;
  let userByEmail;

  if (userEmail) {
    userByEmail = await getUserByEmail(userEmail);

    const generatedResponse = generateUserResponse(session, userByEmail);
    console.assert(generatedResponse, '🙄', generatedResponse);
    // TODO: Handle error
    // res.status(404).json({ user: null })
    response.status(200).json(generatedResponse);
    // response.status(200).json({ user: generatedResponse });
  }

  if (!userByEmail) {
    const createdUser = await createUser({ email: userEmail });
  }
};

export default user;
