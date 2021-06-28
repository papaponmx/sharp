import { NextApiRequest, NextApiResponse } from 'next';

import { Session } from '../../types/index';
import { getLoginSession } from '../../lib/auth';
import { getUserByEmail } from '../../graphql/fetchers/index';

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session = await getLoginSession(req);
  const userEmail: string = session.email;
  // TODO: Get session.email and look up in FaunaDB

  const userByEmail = await getUserByEmail(userEmail);

  if (!userByEmail) {
    // TODO: CreateUser
  }
  debugger;
  // TODO: Handle error
  // res.status(404).json({ user: null })
  // return

  res.status(200).json({ user: session });
};

export default user;
