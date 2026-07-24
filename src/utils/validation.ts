export const MESSAGE_MIN_LENGTH = 1;
export const MESSAGE_MAX_LENGTH = 500;

/** Returns an error string or null if valid (matches API rules). */
export function validateMessage(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.length < MESSAGE_MIN_LENGTH) {
    return 'Message cannot be empty';
  }
  if (trimmed.length > MESSAGE_MAX_LENGTH) {
    return `Message cannot exceed ${MESSAGE_MAX_LENGTH} characters`;
  }
  return null;
}
