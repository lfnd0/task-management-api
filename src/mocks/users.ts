import { randomUUID } from 'node:crypto';

export const users = [
  {
    id: randomUUID(),
    username: 'logan',
  },
  {
    id: randomUUID(),
    username: 'spencer',
  },
  {
    id: randomUUID(),
    username: 'george',
  },
];
