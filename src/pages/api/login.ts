import { NextApiRequest, NextApiResponse } from 'next';

import { Session } from '../../types/index';
import { magic } from '../../lib/magic';
import { setLoginSession } from '../../lib/auth';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers.authorization) {
    res
      .status(400)
      .end('Bad Request: Authorization header is missing in request headers');
    return;
  }

  try {
    const didToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(didToken);
    const session: Session = { ...metadata };

    await setLoginSession(res, session);

    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
