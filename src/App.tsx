import { ChatLayout } from './components/ChatLayout';
import { ComposerShell } from './components/ComposerShell';
import { MessageList } from './components/MessageList';
import { env } from './config/env';
import { FIXTURE_MESSAGES } from './data/fixtures';

export function App() {
  return (
    <ChatLayout footer={<ComposerShell />}>
      <MessageList messages={FIXTURE_MESSAGES} currentAuthor={env.currentAuthor} />
    </ChatLayout>
  );
}
