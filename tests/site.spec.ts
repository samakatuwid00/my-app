import { test, expect } from '@playwright/test'

test.describe('shell', () => {
  test('home renders the new header brand', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header.site .brand')).toContainText('Roger Abay')
  })
})
