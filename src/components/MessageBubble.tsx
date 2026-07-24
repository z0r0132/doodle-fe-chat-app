import type { Message } from '../types/message';
import { decodeHtmlEntities, formatMessageTime } from '../utils/format';
import './MessageBubble.css';

type MessageBubbleProps = {
  message: Message;
  isOutgoing: boolean;
};

export function MessageBubble({ message, isOutgoing }: MessageBubbleProps) {
  const body = decodeHtmlEntities(message.message);
  const time = formatMessageTime(message.createdAt);

  return (
    <article
      className={isOutgoing ? 'message-bubble outgoing' : 'message-bubble incoming'}
      aria-label={isOutgoing ? 'Your message' : `Message from ${message.author}`}
    >
      {!isOutgoing ? <p className="message-author">{message.author}</p> : null}
      <p className="message-body">{body}</p>
      <time className="message-time" dateTime={message.createdAt}>
        {time}
      </time>
    </article>
  );
}
