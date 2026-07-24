/** Formats API timestamps like the mockups: "10 Mar 2018 9:55". */
export function formatMessageTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

/** Decodes entities like &#39; from API seed data without dangerouslySetInnerHTML. */
export function decodeHtmlEntities(text: string): string {
  const element = document.createElement('textarea');
  element.innerHTML = text;
  return element.value;
}
