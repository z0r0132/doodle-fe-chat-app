import { useState, type FormEvent } from 'react';
import { MESSAGE_MAX_LENGTH } from '../utils/validation';
import './Composer.css';

type ComposerProps = {
  disabled?: boolean;
  isSending: boolean;
  sendError: string | null;
  onSend: (text: string) => Promise<boolean>;
};

export function Composer({ disabled = false, isSending, sendError, onSend }: ComposerProps) {
  const [text, setText] = useState('');

  const canSubmit = !disabled && !isSending && text.trim().length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    const ok = await onSend(text);
    if (ok) {
      setText('');
    }
  }

  return (
    <form className="composer" aria-label="Message composer" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="message-input">
        Message
      </label>
      <input
        id="message-input"
        className="composer-input"
        type="text"
        name="message"
        placeholder="Message"
        autoComplete="off"
        maxLength={MESSAGE_MAX_LENGTH}
        value={text}
        disabled={disabled || isSending}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="composer-send" type="submit" disabled={!canSubmit}>
        {isSending ? 'Sending…' : 'Send'}
      </button>
      {sendError ? (
        <p className="composer-error" role="alert">
          {sendError}
        </p>
      ) : null}
    </form>
  );
}
