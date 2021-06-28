import Layout from '../components/layout'
import { useUser } from '../lib/hooks'

const Dashboard = () => {
  const user = useUser({ redirectTo: '/login' })

  return (
    <Layout>
      <h1>Dashboard
      </h1>

      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  )
}

export default Dashboard
