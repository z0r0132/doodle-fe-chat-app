import { expect, test } from '@playwright/test';

test.describe('chat happy path', () => {
  test('loads seed messages, sends with Enter, shows outgoing bubble', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.getByRole('list', { name: 'Messages' })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText(/Doodle poll/i)).toBeVisible();

    const unique = `Keyboard send ${Date.now()}`;
    const input = page.getByRole('textbox', { name: 'Message' });
    await input.fill(unique);
    await input.press('Enter');

    const outgoing = page.getByRole('article', { name: 'Your message' }).filter({
      hasText: unique,
    });
    await expect(outgoing).toBeVisible({ timeout: 10_000 });
    await expect(outgoing.locator('.message-author')).toHaveCount(0);
  });

  test('Send stays disabled for empty input', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('list', { name: 'Messages' })).toBeVisible({
      timeout: 15_000,
    });

    await expect(page.getByRole('button', { name: 'Send' })).toBeDisabled();
  });
});

test.describe('mobile viewport', () => {
  test('composer and messages remain usable on a small screen', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.getByRole('list', { name: 'Messages' })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByRole('form', { name: 'Message composer' })).toBeVisible();

    const unique = `Mobile ${Date.now()}`;
    await page.getByRole('textbox', { name: 'Message' }).fill(unique);
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(
      page.getByRole('article', { name: 'Your message' }).filter({ hasText: unique }),
    ).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('a11y smoke', () => {
  test('key controls are labeled for assistive tech', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('main', { name: 'Chat messages' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
    await expect(page.getByRole('list', { name: 'Messages' })).toHaveAttribute(
      'aria-live',
      'polite',
    );
  });
});
