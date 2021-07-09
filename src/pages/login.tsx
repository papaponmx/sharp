import React, { FormEvent, useState } from 'react';

import Form from '../components/form';
import Layout from '../components/layout';
import { Magic } from 'magic-sdk';
import Router from 'next/router';
import { useUser } from '../hooks';

const { NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY } = process.env;
type SubmitEvent = {
  preventDefault: () => void;
  currentTarget: { email: { value: any } };
};

const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: '/dashboard' });

  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (errorMessage) setErrorMessage('');

    if (!NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY) {
      throw new Error('NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY is not defined');
    }

    const body = {
      email: event.currentTarget.email.value,
    };

    try {
      const magic = new Magic(NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
        redirectURI: `${window.location}.origin}/profile`,
      });
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        Router.push('/dashboard');
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An unexpected error happened occurred:', error);
      setErrorMessage(error.message);
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form errorMessage={errorMessage} onSubmit={handleSubmit} />
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
  );
};

export default Login;
