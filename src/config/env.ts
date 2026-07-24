export type AppEnv = {
  apiBaseUrl: string;
  apiToken: string;
  currentAuthor: string;
  pollIntervalMs: number;
};

function requireEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function parsePositiveInt(name: keyof ImportMetaEnv, raw: string): number {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer (got "${raw}")`);
  }
  return parsed;
}

export const env: AppEnv = {
  apiBaseUrl: requireEnv('VITE_API_BASE_URL').replace(/\/$/, ''),
  apiToken: requireEnv('VITE_API_TOKEN'),
  currentAuthor: requireEnv('VITE_CURRENT_AUTHOR'),
  pollIntervalMs: parsePositiveInt(
    'VITE_POLL_INTERVAL_MS',
    requireEnv('VITE_POLL_INTERVAL_MS'),
  ),
};
