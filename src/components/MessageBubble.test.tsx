import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MessageBubble } from './MessageBubble';
import type { Message } from '../types/message';

const base: Message = {
  _id: '1',
  author: 'Patricia',
  message: 'Sounds good to me!',
  createdAt: '2018-03-10T10:22:00.000Z',
};

describe('MessageBubble', () => {
  it('shows author on incoming messages', () => {
    render(<MessageBubble message={base} isOutgoing={false} />);

    expect(screen.getByText('Patricia')).toBeInTheDocument();
    expect(screen.getByText('Sounds good to me!')).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Message from Patricia' })).toBeInTheDocument();
  });

  it('hides author on outgoing messages', () => {
    render(
      <MessageBubble
        message={{ ...base, author: 'You' }}
        isOutgoing={true}
      />,
    );

    expect(screen.queryByText('You')).not.toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Your message' })).toBeInTheDocument();
  });

  it('decodes HTML entities in the body', () => {
    render(
      <MessageBubble
        message={{ ...base, message: "Cool! It&#39;s super easy to vote." }}
        isOutgoing={false}
      />,
    );

    expect(screen.getByText("Cool! It's super easy to vote.")).toBeInTheDocument();
  });
});
