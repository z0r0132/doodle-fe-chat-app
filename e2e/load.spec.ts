import { expect, test } from '@playwright/test';

test.describe('live message load', () => {
  test('loads messages from the Chat API', async ({ page }) => {
    await page.goto('/');

    const list = page.getByRole('list', { name: 'Messages' });
    await expect(list).toBeVisible({ timeout: 15_000 });

    // Seed authors from the API repo
    await expect(page.getByRole('article', { name: /Message from Luka/ }).first()).toBeVisible();
    await expect(page.getByText(/Doodle poll/i)).toBeVisible();
  });
});
