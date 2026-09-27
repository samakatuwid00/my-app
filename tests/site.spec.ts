import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test.describe('shell', () => {
  test('home renders the new header brand', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header.site .brand')).toContainText('Roger Abay')
  })
})

test.describe('type and ink', () => {
  test('body is Inter Tight on the black ground', async ({ page }) => {
    await page.goto('/')
    const body = await page.evaluate(() => {
      const s = getComputedStyle(document.body)
      return { font: s.fontFamily, bg: s.backgroundColor }
    })
    expect(body.font).toContain('Inter Tight')
    expect(body.bg).toBe('rgb(11, 11, 11)')
  })
})

test('assistant context excludes hidden projects', () => {
  const context = readFileSync('api/context.ts', 'utf8')
  expect(context).not.toContain('Eurasian')
  expect(context).toContain('iRIMS-V Library System')
  expect(context).toContain('Cygnus')
})

test.describe('navigation', () => {
  test('section links and legacy redirects', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveURL('/')
    await page.goto('/projects')
    await expect(page).toHaveURL('/#work')
    await page.goto('/contact')
    await expect(page).toHaveURL('/#contact')
  })
  test('unknown path is a real 404', async ({ page }) => {
    await page.goto('/nope')
    await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible()
  })
  test('header turns paper over a paper band', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop header')
    await page.goto('/')
    await expect(page.locator('header.site')).toHaveClass(/dark/)
    await page.locator('#work').scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollBy(0, 200))
    await expect(page.locator('header.site')).toHaveClass(/light/)
  })
  test('phone menu opens full screen and closes on Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'phone only')
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
  })
})

test.describe('hero', () => {
  test('name, tagline, credits', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Roger A\.\s*Abay Jr\./)
    await expect(page.locator('.credits dt')).toHaveText(['Now', 'Before', 'Recognized', 'Education'])
  })
  test('portrait thinks on hover, next line each visit', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/')
    await page.hover('#me')
    await expect(page.locator('.thought')).toBeVisible()
    await expect(page.locator('#thought-text')).toHaveText('Right now: building the iRIMS-V Library app in Flutter.')
    await page.mouse.move(5, 5)
    await page.hover('#me')
    await expect(page.locator('#thought-text')).toHaveText('Still shipping updates to iRIMS-V.')
  })
  test('portrait thought toggles on tap', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'touch')
    await page.goto('/')
    await page.tap('#me')
    await expect(page.locator('#me')).toHaveClass(/open/)
    await expect(page.locator('#thought-text')).toHaveText('Right now: building the iRIMS-V Library app in Flutter.')
  })
  test('a hash jump leaves the header on the band it landed on', async ({ page }) => {
    await page.goto('/#experience')
    await expect(page.locator('header.site')).toHaveClass(/dark/)
    await page.goto('/#work')
    await expect(page.locator('header.site')).toHaveClass(/light/)
  })
})
