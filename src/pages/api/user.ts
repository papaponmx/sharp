import { NextApiRequest, NextApiResponse } from 'next';

import { Session } from '../../types/index';
import { getLoginSession } from '../../lib/auth';
import { getUserByEmail } from '../../graphql/fetchers/index';

// TODO: Move this to a fetcher
const findUserByEmail = (email: string) => {};

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session = await getLoginSession(req);
  // const userEmail: string = session.email;
  const userEmail: string = 'notfound@gmail.com';
  // TODO: Get session.email and look up in FaunaDB

  const isUserAuth = await getUserByEmail(userEmail);

  debugger;

  res.status(200).json({ user: session || null });
};

export default user;
