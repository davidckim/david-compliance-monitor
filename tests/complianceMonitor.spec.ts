import { test, expect, Page } from '@playwright/test';

const TEST_CASES = {
  compliant: {
    action: 'Closed ticket #48219 and sent confirmation email',
    guideline: 'All closed tickets must include a confirmation email',
  },
  deviant: {
    action: 'Closed ticket #48219 without sending confirmation email',
    guideline: 'All closed tickets must include a confirmation email',
  },
  unclear: {
    action: 'Skipped torque confirmation at Station 3',
    guideline: 'No guidelines exist for this case.',
  },
};

async function fillAndSubmit(page: Page, action: string, guideline: string) {
  await page.getByLabel('Action').fill(action);
  await page.getByLabel('Guideline').fill(guideline);
  await page.getByRole('button', { name: 'Analyze' }).click();
}

async function waitForResult(page: Page) {
  const result = page.getByRole('region', { name: 'Analysis result' });
  await expect(result).toBeVisible({ timeout: 15000 });
  return result;
}

test.describe('Compliance Monitor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('form renders with both input fields and submit button', async ({
    page,
  }) => {
    await expect(page.getByLabel('Action')).toBeVisible();
    await expect(page.getByLabel('Guideline')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Analyze' })).toBeVisible();
  });

  test('compliant action shows COMPLIES result', async ({ page }) => {
    const { action, guideline } = TEST_CASES.compliant;
    await fillAndSubmit(page, action, guideline);

    const result = await waitForResult(page);
    await expect(result.getByText('COMPLIES')).toBeVisible();
  });

  test('non-compliant action shows DEVIATES result', async ({ page }) => {
    const { action, guideline } = TEST_CASES.deviant;
    await fillAndSubmit(page, action, guideline);

    const result = await waitForResult(page);
    await expect(result.getByText('DEVIATES')).toBeVisible();
  });

  test('action with no matching guideline shows UNCLEAR result', async ({
    page,
  }) => {
    const { action, guideline } = TEST_CASES.unclear;
    await fillAndSubmit(page, action, guideline);

    const result = await waitForResult(page);
    await expect(result.getByText('UNCLEAR')).toBeVisible();
  });

  test('result is saved to history after submission', async ({ page }) => {
    const { action, guideline } = TEST_CASES.compliant;
    await fillAndSubmit(page, action, guideline);
    await waitForResult(page);

    const history = page.getByRole('list', { name: 'Analysis history' });
    await expect(history).toBeVisible();
    await expect(history.getByText(action, { exact: false })).toBeVisible();
  });
});
