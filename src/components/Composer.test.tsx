import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Composer } from './Composer';

afterEach(() => {
  cleanup();
});

describe('Composer', () => {
  it('does not send empty messages', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn().mockResolvedValue(true);

    render(<Composer isSending={false} sendError={null} onSend={onSend} />);

    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('sends text and clears the input on success', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn().mockResolvedValue(true);

    render(<Composer isSending={false} sendError={null} onSend={onSend} />);

    const input = screen.getByRole('textbox', { name: 'Message' });
    await user.type(input, 'Hello team');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(onSend).toHaveBeenCalledWith('Hello team');
    expect(input).toHaveValue('');
  });

  it('keeps the input when send fails', async () => {
    const user = userEvent.setup();
    const onSend = vi.fn().mockResolvedValue(false);

    render(
      <Composer isSending={false} sendError="Request failed" onSend={onSend} />,
    );

    const input = screen.getByRole('textbox', { name: 'Message' });
    await user.type(input, 'Retry me');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(input).toHaveValue('Retry me');
    expect(screen.getByRole('alert')).toHaveTextContent('Request failed');
  });
});
