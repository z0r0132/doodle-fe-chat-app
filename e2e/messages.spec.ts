import { expect, test } from '@playwright/test';

test('fixture-style incoming and outgoing still apply with live data', async ({ page }) => {
  await page.goto('/');

  const list = page.getByRole('list', { name: 'Messages' });
  await expect(list).toBeVisible({ timeout: 15_000 });

  await expect(page.getByRole('article', { name: /Message from / }).first()).toBeVisible();
});
