import { ChatLayout } from './components/ChatLayout';
import { Composer } from './components/Composer';
import { MessageList } from './components/MessageList';
import { env } from './config/env';
import { useMessages } from './hooks/useMessages';
import './AppLoad.css';

export function App() {
  const { messages, status, error, isSending, sendError, sendMessage } = useMessages();

  return (
    <ChatLayout
      footer={
        <Composer
          disabled={status !== 'ready'}
          isSending={isSending}
          sendError={sendError}
          onSend={sendMessage}
        />
      }
    >
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
