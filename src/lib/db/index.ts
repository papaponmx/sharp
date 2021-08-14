import { FAUNA_SECRET } from '$lib/config';

export const Authorization = `Bearer ${FAUNA_SECRET}`;

export const faunaDefaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization,
  },
};

export * from './getUserById'