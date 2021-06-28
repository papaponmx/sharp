import React, { FormEvent, useState } from 'react'

import Form from '../components/form'
import Layout from '../components/layout'
import { Magic } from 'magic-sdk'
import Router from 'next/router'
import { useUser } from '../lib/hooks'

const { NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY } = process.env
type SubmitEvent = { preventDefault: () => void; currentTarget: { email: { value: any } } }


const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    debugger
    if(!NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY){
      throw new Error('NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY is not defined')
    }

    const body = {
      email: e.currentTarget.email.value,
    }

    try {
      const magic = new Magic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
        redirectURI: `${window.location}.origin}/profile`,
      })
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  )
}

export default Login
