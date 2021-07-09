import { NextApiRequest, NextApiResponse } from 'next';

import { Session } from '../../types/index';
import { magic } from '../../lib/magic';
import { setLoginSession } from '../../lib/auth';

type AuthRequest = {
  Authorization: string;
};

export default async function login(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (!request.headers.authorization) {
    response
      .status(400)
      .end('Bad Request: Authorization header is missing in request headers');
    return;
  }

  try {
    const didToken = request.headers.authorization.slice(7);
    const metadata = await magic.users.getMetadataByToken(didToken);
    const session: Session = { ...metadata };

    await setLoginSession(response, session);

    response.status(200).send({ done: true });
  } catch (error) {
    response.status(error.status || 500).end(error.message);
  }
}
