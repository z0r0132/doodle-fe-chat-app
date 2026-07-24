import { ChatLayout } from './components/ChatLayout';
import { ComposerShell } from './components/ComposerShell';
import { env } from './config/env';
import './App.css';

export function App() {
  return (
    <ChatLayout footer={<ComposerShell />}>
      <div className="feed-placeholder">
        <p className="feed-placeholder-title">Message feed</p>
        <p className="feed-placeholder-text">
          Layout shell ready. Outgoing author will be{' '}
          <strong>{env.currentAuthor}</strong>.
        </p>
      </div>
    </ChatLayout>
  );
}
