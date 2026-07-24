import { env } from './config/env';
import './App.css';

export function App() {
  return (
    <div className="app-shell">
      <main className="chat-main" aria-label="Chat">
        <p className="chat-placeholder">
          Chat UI scaffold ready. Author: <strong>{env.currentAuthor}</strong>
        </p>
      </main>
      <footer className="composer-bar" aria-label="Message composer placeholder">
        <span className="composer-placeholder">Composer coming next</span>
      </footer>
    </div>
  );
}
