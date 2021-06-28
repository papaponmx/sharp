import { getLoginSession } from '../../lib/auth'

const user = async (req, res) => {
  const session = await getLoginSession(req)

  // TODO: Get session.email and look up in FaunaDB

  res.status(200).json({ user: session || null })
}

export default user
