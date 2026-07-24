import { useEffect, useRef, useState } from 'react';
import { getMessages } from '../api/messages';
import { getErrorMessage } from '../api/errors';
import { env } from '../config/env';
import type { Message } from '../types/message';
import { mergeMessages, newestCreatedAt } from '../utils/messages';

export type MessagesStatus = 'loading' | 'ready' | 'error';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<MessagesStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    let pollId: number | undefined;

    async function loadInitial() {
      try {
        const initial = await getMessages(undefined, controller.signal);
        if (cancelled) {
          return;
        }
        setMessages(initial);
        setStatus('ready');
        setError(null);
      } catch (err) {
        if (cancelled || controller.signal.aborted) {
          return;
        }
        setStatus('error');
        setError(getErrorMessage(err));
      }
    }

    async function poll() {
      const after = newestCreatedAt(messagesRef.current);
      if (!after) {
        return;
      }
      try {
        const newer = await getMessages({ after }, controller.signal);
        if (cancelled || newer.length === 0) {
          return;
        }
        setMessages((current) => mergeMessages(current, newer));
      } catch {
        // Keep showing the last good list; transient poll failures are ignored.
      }
    }

    void loadInitial().then(() => {
      if (cancelled) {
        return;
      }
      pollId = window.setInterval(() => {
        void poll();
      }, env.pollIntervalMs);
    });

    return () => {
      cancelled = true;
      controller.abort();
      if (pollId !== undefined) {
        window.clearInterval(pollId);
      }
    };
  }, []);

  return { messages, status, error };
}
