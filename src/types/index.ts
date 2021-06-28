/**
 * Object including user metadata returned by `magic.users.getMetadataByToken`
 */
export type Session = {
  createdAt: number
  email: string
  issuer: string
  maxAge: number
  publicAddress: string
}
