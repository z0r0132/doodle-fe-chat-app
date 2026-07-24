import { ChatLayout } from './components/ChatLayout';
import { ComposerShell } from './components/ComposerShell';
import { MessageList } from './components/MessageList';
import { env } from './config/env';
import { useMessages } from './hooks/useMessages';
import './AppLoad.css';

export function App() {
  const { messages, status, error } = useMessages();

  return (
    <ChatLayout footer={<ComposerShell />}>
      {status === 'loading' ? (
        <p className="feed-status" role="status">
          Loading messages…
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="feed-status feed-status-error" role="alert">
          {error ?? 'Could not load messages.'}
        </p>
      ) : null}

      {status === 'ready' ? (
        <MessageList messages={messages} currentAuthor={env.currentAuthor} />
      ) : null}
    </ChatLayout>
  );
}
