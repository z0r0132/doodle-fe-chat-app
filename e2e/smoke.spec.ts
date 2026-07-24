import { expect, test } from '@playwright/test';

test('app boots and shows chat shell', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('main', { name: 'Chat messages' })).toBeVisible();
  await expect(page.getByRole('form', { name: 'Message composer' })).toBeVisible();
  await expect(page.getByPlaceholder('Message')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
});
