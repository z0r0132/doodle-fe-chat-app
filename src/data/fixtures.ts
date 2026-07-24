import type { Message } from '../types/message';

/** Static fixtures for the message UI slice (API wiring comes next). Oldest first. */
export const FIXTURE_MESSAGES: Message[] = [
  {
    _id: '1',
    author: 'Luka',
    message: 'Hey team! I created a Doodle poll for our monthly team lunch 🍕',
    createdAt: '2018-03-10T09:55:00.000Z',
  },
  {
    _id: '2',
    author: 'John',
    message: 'Cool! It&#39;s super easy to vote.',
    createdAt: '2018-03-10T10:10:00.000Z',
  },
  {
    _id: '3',
    author: 'Patricia',
    message: 'Sounds good to me!',
    createdAt: '2018-03-10T10:22:00.000Z',
  },
  {
    _id: '4',
    author: 'You',
    message:
      'Hey folks! I wanted to get in touch with you regarding the project. Please, let me know how you plan to contribute.',
    createdAt: '2018-03-12T14:38:00.000Z',
  },
];
