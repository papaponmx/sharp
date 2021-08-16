import { magic } from '../../../routes/api/auth/_magic';

/***
 * @description Validate a DID from magic using
 * [Magic API Reference]( https://magic.link/docs/admin-sdk/node/api-reference#validate)
 * @param {string} did - DID to validate
 */


export const validateDid = async(req: Request): Promise<unknown> => {
  const didToken = magic.utils.parseAuthorizationHeader(req.headers['authorization']);
		return magic.token.validate(didToken);
}