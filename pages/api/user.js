import { getLoginSession } from '../../lib/auth'

const user = async (req, res) => {
  const session = await getLoginSession(req)
  // After getting the session you may want to fetch for the user instead
  // of sending the session's payload directly, this example doesn't have a DB
  // so it won't matter in this case
  res.status(200).json({ user: session || null })
}

export default user
