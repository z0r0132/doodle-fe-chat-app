import { useEffect, useRef } from 'react';
import type { Message } from '../types/message';
import { MessageBubble } from './MessageBubble';
import './MessageList.css';

type MessageListProps = {
  messages: Message[];
  currentAuthor: string;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function MessageList({ messages, currentAuthor }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      block: 'end',
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
  }, [messages.length]);

  if (messages.length === 0) {
    return <p className="message-list-empty">No messages yet.</p>;
  }

  return (
    <div
      className="message-list"
      role="list"
      aria-label="Messages"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((message) => (
        <div key={message._id} className="message-list-item" role="listitem">
          <MessageBubble
            message={message}
            isOutgoing={message.author === currentAuthor}
          />
        </div>
      ))}
      <div ref={endRef} aria-hidden="true" />
    </div>
  );
}
