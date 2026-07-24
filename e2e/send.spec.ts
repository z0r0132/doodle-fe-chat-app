import { expect, test } from '@playwright/test';

test('sending a message shows it as outgoing', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('list', { name: 'Messages' })).toBeVisible({
    timeout: 15_000,
  });

  const unique = `E2E ping ${Date.now()}`;
  await page.getByPlaceholder('Message').fill(unique);
  await page.getByRole('button', { name: 'Send' }).click();

  const outgoing = page.getByRole('article', { name: 'Your message' }).filter({
    hasText: unique,
  });
  await expect(outgoing).toBeVisible({ timeout: 10_000 });
  await expect(outgoing.locator('.message-author')).toHaveCount(0);
});
