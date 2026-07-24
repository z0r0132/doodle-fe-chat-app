import { expect, test } from '@playwright/test';

test('fixture messages render incoming and outgoing', async ({ page }) => {
  await page.goto('/');

  const list = page.getByRole('list', { name: 'Messages' });
  await expect(list).toBeVisible();

  await expect(page.getByRole('article', { name: 'Message from Luka' })).toBeVisible();
  await expect(page.getByRole('article', { name: 'Message from Patricia' })).toBeVisible();

  const outgoing = page.getByRole('article', { name: 'Your message' });
  await expect(outgoing).toBeVisible();
  await expect(outgoing.locator('.message-author')).toHaveCount(0);
  await expect(outgoing).toContainText('Hey folks!');
});
