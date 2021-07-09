import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByEmail } from '../../db/index';

import { Session } from '../../types/index';
import { getLoginSession } from '../../lib/auth';

const user = async (request: NextApiRequest, response: NextApiResponse) => {
  const session: Session = await getLoginSession(request);
  const userEmail: string = session?.email;
  // TODO: Validate if user exists
  // const userEmail: string = 'john@mailinator.com';

  const userByEmail = await getUserByEmail(userEmail);

  if (!userByEmail) {
    const createdUser = await createUser({ email: userEmail });
    console.log('👀 User', createdUser);
  }
  // TODO: Handle error
  // res.status(404).json({ user: null })
  // return

  res.status(200).json({ user: session });
};

export default user;
