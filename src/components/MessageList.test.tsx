import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MessageList } from './MessageList';
import { FIXTURE_MESSAGES } from '../data/fixtures';

describe('MessageList', () => {
  it('renders incoming and outgoing bubbles', () => {
    render(<MessageList messages={FIXTURE_MESSAGES} currentAuthor="You" />);

    expect(screen.getByRole('list', { name: 'Messages' })).toBeInTheDocument();
    expect(screen.getByText('Luka')).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Your message' })).toBeInTheDocument();
    expect(screen.queryByText('You')).not.toBeInTheDocument();
  });

  it('shows empty state when there are no messages', () => {
    render(<MessageList messages={[]} currentAuthor="You" />);
    expect(screen.getByText('No messages yet.')).toBeInTheDocument();
  });
});
