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

test.describe('work', () => {
  test('four featured systems in order, Eurasian absent', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work article.case h3')).toHaveText(['iRIMS-V', 'EDULEAVE', 'LRMIS', 'iRIMS-V Library System'])
    await expect(page.getByText('Eurasian')).toHaveCount(0)
    await expect(page.locator('a[href="https://irimsv-library.net/"]').first()).toBeVisible()
  })
  test('no placeholder result rows', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .facts dt', { hasText: 'Result' })).toHaveCount(0)
  })
  test('head counts the systems in words', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .head p')).toHaveText(/^Four systems in production\./)
  })
  test('only iRIMS-V has a case study; the rest preview to their live site', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .btn', { hasText: 'Case study' })).toHaveCount(1)
    await expect(page.locator('#work article.case').first().locator('a[data-shot]')).toHaveAttribute('href', '/work/irims-v')
    await expect(page.locator('#work article.case').nth(1).locator('a:has(.ht)')).toHaveAttribute('href', 'https://eduleave.com/welcome')
  })
  test('screenshots are halftoned grayscale', async ({ page }) => {
    await page.goto('/#work')
    const img = page.locator('#work article.case .ht img').first()
    await expect(img).toHaveCSS('filter', /grayscale\(1\)/)
    const dots = await page.locator('#work article.case .ht').first().evaluate((el) => getComputedStyle(el, '::after').backgroundImage)
    expect(dots).toContain('radial-gradient')
  })
  test('hover clears the dot screen', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/#work')
    const ht = page.locator('#work article.case .ht').first()
    await ht.hover()
    await expect.poll(() => ht.evaluate((el) => getComputedStyle(el, '::after').opacity)).toBe('0')
  })
  test('more work table lists the non-featured systems', async ({ page }) => {
    await page.goto('/#work')
    await expect(page.locator('#work .tr .name')).toHaveText(['schema_mapper', 'iRIMS-V Library app'])
    await expect(page.locator('#work .tr > .ui.soft')).toHaveText(['Internal', 'In progress'])
  })
})

test.describe('services', () => {
  test('figures play once in view', async ({ page }) => {
    await page.goto('/#services')
    await expect(page.locator('#flow')).toHaveClass(/armed/)
    await expect(page.locator('#flow li.fig-records')).toHaveClass(/\bon\b/)
  })
  test.describe('reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })
    test('figures are complete and never armed', async ({ page }) => {
      await page.goto('/#services')
      await expect(page.locator('#flow')).not.toHaveClass(/armed/)
      await expect(page.locator('#flow li')).toHaveCount(4)
    })
  })
})

test.describe('experience', () => {
  test('timeline and rows', async ({ page }) => {
    await page.goto('/#experience')
    await expect(page.locator('#timeline .bar')).toHaveCount(4)
    await expect(page.locator('.role-row')).toHaveCount(4)
    await expect(page.locator('.role-row > .ui').first()).toHaveText('2025 – Present')
  })
  test('row hover highlights its bar', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover')
    await page.goto('/#experience')
    await page.hover('.role-row[data-k="co"]')
    await expect(page.locator('#timeline')).toHaveClass(/focus/)
    await expect(page.locator('#timeline .bar[data-k="co"]')).toHaveClass(/hl/)
  })
  test.describe('reduced motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })
    test('timeline is complete and never armed', async ({ page }) => {
      await page.goto('/#experience')
      await expect(page.locator('#timeline')).not.toHaveClass(/armed/)
      await expect(page.locator('#timeline .bar')).toHaveCount(4)
    })
  })
})
