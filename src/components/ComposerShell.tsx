import './ComposerShell.css';

/**
 * Visual composer shell for the design slice.
 * Send behavior is wired in a later todo.
 */
export function ComposerShell() {
  return (
    <form
      className="composer"
      aria-label="Message composer"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
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
        disabled
        aria-disabled="true"
      />
      <button className="composer-send" type="submit" disabled>
        Send
      </button>
    </form>
  );
}
