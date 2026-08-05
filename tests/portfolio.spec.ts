import { test, expect, type Page } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

async function navigateAndWaitFor(page: Page, path: string) {
  await page.goto(`${BASE_URL}${path}`)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500)
}

test.describe('Scroll-to-top button', () => {
  test('appears after scrolling down 200px', async ({ page }) => {
    await navigateAndWaitFor(page, '/about')

    // Make the page scrollable for testing
    await page.evaluate(() => {
      document.body.style.minHeight = '2000px'
    })

    // Initially hidden
    const btn = page.locator('button[aria-label="Scroll to top"]')
    await expect(btn).toBeHidden()

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(300)

    await expect(btn).toBeVisible()
  })

  test('scrolls to top when clicked', async ({ page }) => {
    await navigateAndWaitFor(page, '/about')

    // Make the page scrollable for testing
    await page.evaluate(() => {
      document.body.style.minHeight = '2000px'
    })

    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(300)

    const btn = page.locator('button[aria-label="Scroll to top"]')
    await expect(btn).toBeVisible()
    await btn.click()
    await page.waitForTimeout(800)

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(50)
  })
})

test.describe('Back button', () => {
  test('ProjectsView shows back-to-about link', async ({ page }) => {
    await navigateAndWaitFor(page, '/projects')
    const backLink = page.locator('text=/back to about/i')
    await expect(backLink).toBeVisible()
  })

  test('FeedbackView shows back-to-projects link', async ({ page }) => {
    await navigateAndWaitFor(page, '/feedback')
    const backLink = page.locator('text=/back to projects/i')
    await expect(backLink).toBeVisible()
  })

  test('ContactView shows back-to-about link', async ({ page }) => {
    await navigateAndWaitFor(page, '/contact')
    const backLink = page.locator('text=/back to about/i')
    await expect(backLink).toBeVisible()
  })

  test('Back link navigates to the correct route', async ({ page }) => {
    await navigateAndWaitFor(page, '/projects')
    await page.click('text=/back to about/i')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL(/\/about/)
  })
})

test.describe('No em dashes in visible text', () => {
  const emDash = '—'

  for (const path of ['/about', '/projects', '/feedback', '/contact']) {
    test(`no em dashes on ${path}`, async ({ page }) => {
      await navigateAndWaitFor(page, path)
      const bodyText = await page.textContent('body')
      expect(bodyText).not.toContain(emDash)
    })
  }
})

test.describe('Font consistency', () => {
  test('body uses monospace font stack', async ({ page }) => {
    await navigateAndWaitFor(page, '/about')
    const bodyFont = await page.evaluate(() => {
      return getComputedStyle(document.body).fontFamily
    })
    expect(bodyFont).toMatch(/monospace|JetBrains/i)
  })

  test('prose uses sans-serif font', async ({ page }) => {
    await navigateAndWaitFor(page, '/about')
    const prose = page.locator('.prose-body')
    if (await prose.count() > 0) {
      const font = await prose.first().evaluate((el) =>
        getComputedStyle(el).fontFamily
      )
      expect(font).toMatch(/sans-serif|Inter/i)
    }
  })
})

test.describe('No AI-coded design patterns', () => {
  test('no glow, neon, text-shadow, or emoji on page', async ({ page }) => {
    await navigateAndWaitFor(page, '/about')

    const styles = await page.evaluate(() => {
      const elements = document.body.querySelectorAll('*')
      const results: string[] = []
      elements.forEach((el) => {
        const cs = getComputedStyle(el)
        if (cs.textShadow && cs.textShadow !== 'none' && !cs.textShadow.includes('0px')) {
          results.push(`text-shadow: ${cs.textShadow} on ${el.tagName}`)
        }
        if (cs.filter && cs.filter !== 'none') {
          results.push(`filter: ${cs.filter} on ${el.tagName}`)
        }
      })
      return results
    })

    expect(styles).toEqual([])

    // Check for emoji in text content
    const text = await page.textContent('body')
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F1FF}]/u
    expect(text).not.toMatch(emojiRegex)
  })
})
