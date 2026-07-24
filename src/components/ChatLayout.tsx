import type { ReactNode } from 'react';
import './ChatLayout.css';

type ChatLayoutProps = {
  children: ReactNode;
  footer: ReactNode;
};

export function ChatLayout({ children, footer }: ChatLayoutProps) {
  return (
    <div className="chat-layout">
      <main className="chat-feed" aria-label="Chat messages">
        {children}
      </main>
      <div className="chat-footer">{footer}</div>
    </div>
  );
}
